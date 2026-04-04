import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Jaskaran Joshi | Portfolio',
        short_name: 'Jaskaran Joshi',
        description: 'Python Developer, Cybersecurity Analyst & Full Stack Engineer',
        theme_color: '#020c1b',
        background_color: '#020c1b',
        display: 'standalone',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      }
    })
  ],
  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Enable minification
    minify: 'esbuild',
    cssMinify: 'esbuild',
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
    // Chunk size warning threshold
    chunkSizeWarningLimit: 500,
    // No source maps in production
    sourcemap: false,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})

