import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/',
        // eslint-disable-next-line no-undef
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
});
