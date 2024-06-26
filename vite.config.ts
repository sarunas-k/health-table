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
    open: './index.html',
    host: '127.0.0.1'
  },
  optimizeDeps: {
    include: ['./src/components/**/*.vue']
  },
  base:'./',
  build: {
    watch: {},
    commonjsOptions: {
      include: ['./src/components/**/*.vue']
    },
    outDir: 'dist/',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: ({name}) => {
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash].css';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
})
