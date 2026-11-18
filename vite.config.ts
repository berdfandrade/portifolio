import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Em desenvolvimento, /api vai para o server.js (rode `npm start` em outro terminal, com as chaves do Spotify).
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
