import { reactRouter } from "@react-router/dev/vite";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import autoprefixer from "autoprefixer";
import cssNesting from "postcss-nesting";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "amoscato",
  project: "podcast",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  debug: true,
};

export default defineConfig((config) => ({
  css: {
    postcss: {
      plugins: [autoprefixer, cssNesting],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    sentryReactRouter(sentryConfig, config),
  ],
  sentryConfig,
}));
