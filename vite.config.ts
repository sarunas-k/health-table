import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: './dist/index.html',
  },
  optimizeDeps: {
    include: ['./assets/**/*.vue']
  },
  build: {
    commonjsOptions: {
      include: ['./assets/**/*.vue']
    },
    outDir: './dist/',
    assetsDir: './assets'
  },
  base: '/dist'
})
