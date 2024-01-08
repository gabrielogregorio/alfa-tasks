import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { envs } from './src/core/env';

const baseUrl = envs.VITE_BASE_URL || '/alfa-tasks';

export default defineConfig({
  root: '.',
  base: baseUrl,
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@/base': resolve(__dirname, './src/components/base'),
      '@/layouts': resolve(__dirname, './src/components/layouts'),
      '@/screens': resolve(__dirname, './src/screens'),
      '@/templates': resolve(__dirname, './src/components/templates'),
      '@/widgets': resolve(__dirname, './src/components/widgets'),
      '@/screen': resolve(__dirname, './src/components/screen'),
      '@/tasks': resolve(__dirname, './src/tasks'),
      '@/common': resolve(__dirname, './src/common'),

      '@/mappers': resolve(__dirname, './src/core/mappers'),
      '@/configs': resolve(__dirname, './src/core/configs'),
      '@/connections': resolve(__dirname, './src/core/connections'),
      '@/constants': resolve(__dirname, './src/core/constants'),
      '@/contracts': resolve(__dirname, './src/core/contracts'),
      '@/helpers': resolve(__dirname, './src/core/helpers'),
      '@/data': resolve(__dirname, './src/core/data'),
      '@/errors': resolve(__dirname, './src/core/errors'),
      '@/guard': resolve(__dirname, './src/core/guard'),
      '@/hooks': resolve(__dirname, './src/core/hooks'),
      '@/libs': resolve(__dirname, './src/core/libs'),
      '@/locales': resolve(__dirname, './src/core/locales'),
      '@/services': resolve(__dirname, './src/core/services'),
      '@/utils': resolve(__dirname, './src/core/utils'),
      '@/core': resolve(__dirname, './src/core'),
      '@/features': resolve(__dirname, './src/features'),

      '@/mocks': resolve(__dirname, './src/mocks'),
      '@/pages': resolve(__dirname, './src/pages'),
    },
  },
  // @ts-ignore
  test: {
    css: false,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      base: baseUrl,
      includeAssets: ['favicon.ico', 'icon.png', 'icon-512x512.png'],
      manifest: {
        name: 'Youtube Reload',
        short_name: 'youtube reload',
        description: 'Descubra várias músicas inéditas',
        theme_color: '#32323e',
        background_color: '#32323e',
        orientation: 'portrait',
        start_url: baseUrl + '/registerSW.js',
        scope: baseUrl,
        display: 'standalone',
        icons: [
          {
            src: baseUrl + '/icons/icon-192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: baseUrl + '/icons/icon-512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: baseUrl + '/icons/icon-maskable-192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: baseUrl + '/icons/icon-maskable-512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
      },

      // devOptions: {
      //   enabled: true,
      // },
    }),
    sentryVitePlugin({
      org: 'gregorio-kg',
      project: 'alfa-tasks',
    }),
  ],
});
