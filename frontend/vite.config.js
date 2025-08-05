// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // if using React
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // keep your framework plugin
    tailwindcss(),  // add tailwind plugin
  ],
  server: {
    host: true,
    allowedHosts: ['72dde7c43472.ngrok-free.app']
  }
})
