// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy all Smart Village API endpoints
      "/event": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/resident": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/user": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/smartvillage": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/village": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/view": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/join-community-by-coordinates": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/locate": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/me": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/place": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
