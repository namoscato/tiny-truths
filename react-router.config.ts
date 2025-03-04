import type { Config } from "@react-router/dev/config";
import {
  sentryOnBuildEnd,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

export default {
  buildEnd({ viteConfig, reactRouterConfig, buildManifest }) {
    const {
      authToken,
      org,
      project,
      release,
      sourceMapsUploadOptions = { enabled: true },
      debug = false,
    } = getSentryConfig(viteConfig);

    console.log({
      sourceMapsUploadOptions,
      enabled:
        sourceMapsUploadOptions?.enabled ??
        (true && viteConfig.build.sourcemap !== false),
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      org,
      project,
    });
    sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest });
  },
  prerender,
  ssr: false,
} satisfies Config;

async function prerender() {
  const episodes = await getEpisodeConfigs();

  return [
    "/",
    "/episodes",
    ...episodes.map(({ number }) => `/episodes/${number}`),
  ];
}

function getSentryConfig(viteConfig: unknown): SentryReactRouterBuildOptions {
  if (
    !viteConfig ||
    typeof viteConfig !== "object" ||
    !("sentryConfig" in viteConfig)
  ) {
    console.error(
      "[Sentry] sentryConfig not found - it needs to be passed to vite.config.ts",
    );
  }

  return (viteConfig as { sentryConfig: SentryReactRouterBuildOptions })
    .sentryConfig;
}
