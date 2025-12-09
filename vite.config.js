import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Chunks ka size limit set karna
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        // 2. Heavy libraries ko alag file mein daalna (Vendor Splitting)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer'; // Animation library alag file mein
            }
            if (id.includes('lucide-react')) {
              return 'icons'; // Icons alag file mein
            }
            return 'vendor'; // Baki sab libraries alag
          }
        },
      },
    },
  },
})