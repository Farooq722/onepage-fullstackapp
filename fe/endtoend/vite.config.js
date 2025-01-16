import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Expose server to all network interfaces
    port: 5173,        // Ensure the port matches the one exposed in the service
  },
})