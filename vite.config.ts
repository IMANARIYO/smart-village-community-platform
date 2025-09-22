// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import tailwindcss from "@tailwindcss/vite";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current file's full path (equivalent to __filename in CommonJS)
const __filename = fileURLToPath(import.meta.url);

// Get the directory name (equivalent to __dirname in CommonJS)
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      // Proxy all Smart Village API endpoints
      "/event": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/volunter": {
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

      "/contact": {
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
      "/leaders": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/place": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/participations/": {
        target: "https://smartville.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "/src/components"),
      "@/components/ui": path.resolve(__dirname, "/src/components"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/lib/utils"),
    },
  },

  base: "/",
});
