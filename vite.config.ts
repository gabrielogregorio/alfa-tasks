import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { envs } from './src/config/envs';

const baseUrl = envs.VITE_BASE_URL || '/my-daily';

const moveMetaCharsetToUp = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      const metaCharset = `<meta charset="UTF-8" />`;
      return html.replace(/(<head>)/i, `$1${metaCharset}`);
    },
  };
};

export default defineConfig({
  root: '.',
  base: `${baseUrl}/`,
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@/tasks': resolve(__dirname, './src/tasks'),
      '@/common': resolve(__dirname, './src/common'),
    },
  },
  plugins: [
    moveMetaCharsetToUp(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // true,
      },
      base: `${baseUrl}/`,
      includeAssets: ['favicon.ico', 'icon.png', 'icon-512x512.png'],
      manifest: {
        name: 'my-daily',
        short_name: 'my-daily',
        description: 'my-daily',
        theme_color: '#32323e',
        background_color: '#32323e',
        orientation: 'portrait',

        start_url: `${baseUrl}/registerSW.js`,
        // start_url: '/?source=pwa',

        scope: `${baseUrl}/`, // baseUrl,
        display: 'standalone',

        icons: [
          {
            src: `${baseUrl}/icons/icon-192.png`,
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: `${baseUrl}/icons/icon-512.png`,
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: `${baseUrl}/icons/icon-maskable-192.png`,
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: `${baseUrl}/icons/icon-maskable-512.png`,
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
          {
            src: `${baseUrl}/icons/icon-144.png`,
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
});
