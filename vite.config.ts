import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ isSsrBuild }) => ({
  build: { manifest: !isSsrBuild },
  plugins: [
    react(),
    ...(!isSsrBuild ? [VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg', 'robots.txt', 'Panashe_Bobojani_CV.pdf'],
      manifest: {
        name: 'Panashe Bobojani — AI/ML Portfolio',
        short_name: 'Panashe Portfolio',
        description: 'Portfolio of Panashe Bobojani, an AI and Machine Learning graduate and software engineer.',
        theme_color: '#E9EDF3',
        background_color: '#E9EDF3',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })] : [])
  ]
}));
