import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

export default {
  buildEnd({ viteConfig, reactRouterConfig, buildManifest }) {
    console.log(viteConfig);
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
