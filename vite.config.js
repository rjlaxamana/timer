import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/timer/', // Official GitHub Pages repository base path
  server: {
    port: 3000,
    open: true
  }
})

