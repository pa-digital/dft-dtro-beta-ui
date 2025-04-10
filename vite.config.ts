import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'certs/cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.crt')),
    //   ca: fs.readFileSync(path.resolve(__dirname, 'certs/ca.crt')),
    // },
    port: 5173,
    host: 'localhost'
  }
})
