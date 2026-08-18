import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards /api/* to the local Flask server during `npm run dev`
      // so the frontend can call fetch('/api/movies') exactly like it
      // does in production on Vercel.
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
