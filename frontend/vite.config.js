import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        globals: {
          'procress.env.URL_API': JSON.stringify('https://back-financ.onrender.com')
        }
      }
    }
  }
})
