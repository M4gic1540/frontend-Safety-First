import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['frontend-safety-first-production.up.railway.app'],
    host: true  // Esto permite escuchar en todas las interfaces (0.0.0.0)
  }
});
