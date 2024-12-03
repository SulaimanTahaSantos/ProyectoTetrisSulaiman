import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist', // Esto indica que Vite generará los archivos de producción en la carpeta 'dist'
    },
    plugins: [react()],
})