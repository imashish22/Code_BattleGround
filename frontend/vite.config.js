import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'https://api.code-battleground.site',  // Proxy all requests starting with /api to the backend
      // '/api': 'http://localhost:5000',  // Proxy all requests starting with /api to the backend
    },
  },
})


