import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // '/api': 'https://api.code-battleground.site',  // Proxy all requests starting with /api to the backend
      '/api': 'https://teacherapi.code-battleground.site',  // Proxy all requests starting with /api to the backend
    },

}})
