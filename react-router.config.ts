import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

const buildEnd: Config["buildEnd"] = ({
  viteConfig,
  reactRouterConfig,
  buildManifest,
}) => {
  sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest });
};

const prerender: Config["prerender"] = async () => {
  const episodes = await getEpisodeConfigs();

  return [
    "/",
    "/episodes",
    ...episodes.map(({ number }) => `/episodes/${number}`),
  ];
};

export default {
  buildEnd,
  prerender,
  ssr: false,
} satisfies Config;
