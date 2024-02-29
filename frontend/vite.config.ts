import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: '../proxy/ssl/privkey.pem',
      cert: '../proxy/ssl/fullchain.pem',
    },
    proxy: {
      '/api': {
        target: 'https://localhost',
        secure: false }
    }
  }
});
