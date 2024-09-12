import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
  },
  server: {
    host: '0.0.0.0',
    port: 8081
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
