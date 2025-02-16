import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Genera los archivos de producción en la carpeta 'dist'
  },
  plugins: [react()],
  server: {
    historyApiFallback: true // Para desarrollo; redirige rutas desconocidas a index.html
  }
});
