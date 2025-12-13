import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "use-auto-width-input": path.resolve(__dirname, "../src/index.ts"),
    },
  },
})
