import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your backend server URL (adjust port if different)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
