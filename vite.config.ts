import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import cssNesting from "postcss-nesting";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer, cssNesting],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
});
