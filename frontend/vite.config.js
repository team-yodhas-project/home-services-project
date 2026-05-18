import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      writeBundle() {
        const srcPath = path.resolve(__dirname, 'public/_redirects')
        const destPath = path.resolve(__dirname, 'dist/_redirects')
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath)
          console.log('_redirects copied to dist')
        }
      },
    },
  ],
})
