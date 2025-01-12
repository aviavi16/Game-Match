import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' 
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ nodePolyfills(), react(), svgr()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: '../GameMatch-backend/public',
    emptyOutDir: true
  }
})
