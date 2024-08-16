import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "..", "..", ".env") });

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.serverUrl": JSON.stringify(process.env.SERVER_URL ?? ""),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
