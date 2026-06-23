import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the build works on a GitHub Pages
// project subpath (https://user.github.io/repo/) without hardcoding the repo name.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
})
