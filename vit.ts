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

export default defineConfig(() => {
  const apiBaseUrl = process.env.VITE_API_BASE_URL;
  const devPort = parseInt(process.env.VITE_DEV_PORT || "3000");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: devPort,
      host: true,
      proxy: {
        // Proxy all Smart Village API endpoints
        "/event": {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: true,
        },
        "/volunter": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/resident": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/user/login": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/smartvillage": {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: true,
        },
        "/village": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/contact": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/view": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/join-community-by-coordinates": {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: true,
        },
        "/locate": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/me": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/leaders": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/place": { target: apiBaseUrl, changeOrigin: true, secure: true },
        "/participations/": {
          target: apiBaseUrl,
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
  };
});
