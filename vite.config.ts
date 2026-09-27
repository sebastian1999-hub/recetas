import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages sirve el proyecto en /recetas/, no en la raíz del dominio
export default defineConfig({
  base: '/recetas/',
  plugins: [react()],
})
