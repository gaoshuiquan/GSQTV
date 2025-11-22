import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Critical for assets to load in Android WebView (file:// protocol)
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})