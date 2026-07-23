/**
 * @file vite.config.js
 * @description Vite configuration file managing build settings and plugins.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/login-services': {
        target: 'http://20.163.171.252:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://20.163.171.252:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

