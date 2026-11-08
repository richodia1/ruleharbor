import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': process.env.VITE_API_TARGET ?? 'http://127.0.0.1:8190',
      '/actuator/health': process.env.VITE_API_TARGET ?? 'http://127.0.0.1:8190',
    },
  },
  test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'], include: ['src/**/*.test.ts?(x)'] },
})
