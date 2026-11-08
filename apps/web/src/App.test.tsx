import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => vi.unstubAllGlobals())

it('does not imply a backend connection before checking', () => {
  render(<App />)
  expect(screen.getByText('Initial scaffold')).toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('Not checked')
})

it('reports a healthy backend', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'UP' }) }))
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'Check connection' }))
  expect(await screen.findByText('Connected')).toBeInTheDocument()
})

it('reports a failed connection without crashing', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'Check connection' }))
  expect(await screen.findByText('Unavailable')).toBeInTheDocument()
})
