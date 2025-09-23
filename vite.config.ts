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
