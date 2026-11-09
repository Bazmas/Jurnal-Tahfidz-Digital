import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: [
        'favicon.svg',
        'images/logo-jurnal-tahfidz-192.png',
        'images/logo-jurnal-tahfidz-512.png',
        'images/logo-jurnal-tahfidz-192-maskable.png',
        'images/logo-jurnal-tahfidz-512-maskable.png',
      ],
      manifest: {
        name: 'Jurnal Tahfidz Digital',
        short_name: 'Jurnal Tahfidz',
        description:
          "Aplikasi Digital untuk Pencatatan dan Pemantauan Kegiatan Tahfidz Al-Qur'an.",
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#064e3b',
        background_color: '#f5f8f6',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/images/logo-jurnal-tahfidz-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/logo-jurnal-tahfidz-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/images/logo-jurnal-tahfidz-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/images/logo-jurnal-tahfidz-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
        navigateFallbackDenylist: [/^\/api(?:\/|$)/, /^\/auth(?:\/|$)/],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
