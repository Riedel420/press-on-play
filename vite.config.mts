import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { apiPlugin } from './src/plugins/apiPlugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'shared'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true, // Needed for network access
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.mp3', '**/*.ogg', '**/*.wav']
});
