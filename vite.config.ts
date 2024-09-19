import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
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
  },
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        "name": "Open Movie DB - Find your favorite movies",
        "short_name": "OMDB App",
        "start_url": "/",
        "display": "standalone",
        "description": "A fast and easy way to find your favorite movies! supports Chinese and English. super pwa app, with offline support",
        "categories": ["movies", "recreation"],
        "background_color": "#181823",
        "theme_color": "#181823",
        "screenshots": [
          {
            "src": "/screenshots/screenshot-1.png",
            "sizes": "586x1304",
            "type": "image/png"
          },
          {
            "src": "/screenshots/screenshot-2.png",
            "sizes": "586x1304",
            "type": "image/png"
          },
          {
            "src": "/screenshots/screenshot-3.png",
            "sizes": "586x1304",
            "type": "image/png"
          }
        ],
        "shortcuts": [
          {
            "name": "首页",
            "short_name": "Home",
            "description": "search the movies in the home list",
            "url": "/?source=homescreen",
            "icons": [{ "src": "/icons/icon-96x96.png", "sizes": "96x96" }]
          },
          {
            "name": "书签",
            "short_name": "BookMarks",
            "description": "View the list of movie you saved for later",
            "url": "/bookmark?source=homescreen",
            "icons": [{ "src": "/icons/icon-96x96.png", "sizes": "96x96" }]
          }
        ]
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
})
