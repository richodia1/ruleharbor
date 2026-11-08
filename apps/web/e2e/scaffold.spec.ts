import { expect, test } from '@playwright/test'

test('workspace reports actual health responses and fits the viewport', async ({ page }, info) => {
  await page.route('**/actuator/health', route => route.fulfill({ json: { status: 'UP' } }))
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Workspace' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Not checked')
  await page.getByRole('button', { name: 'Check connection' }).click()
  await expect(page.getByRole('status')).toHaveText('Connected')
  await page.route('**/actuator/health', route => route.fulfill({ status: 503, json: { status: 'DOWN' } }))
  await page.getByRole('button', { name: 'Check connection' }).click()
  await expect(page.getByRole('status')).toHaveText('Unavailable')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.screenshot({ path: info.outputPath('workspace.png'), fullPage: true })
})
