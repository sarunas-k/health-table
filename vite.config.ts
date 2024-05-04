import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: './index.html',
  },
  optimizeDeps: {
    include: ['./src/components/**/*.vue']
  },
  build: {
    watch: {},
    commonjsOptions: {
      include: ['./src/components/**/*.vue']
    },
    outDir: './dist',
    // assetsDir: './assets',
    rollupOptions: {
      output: {
        assetFileNames: ({name}) => {
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name][extname]';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
})
