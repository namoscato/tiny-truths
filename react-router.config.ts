import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

export default {
  buildEnd: sentryOnBuildEnd,
  prerender,
  ssr: false,
} satisfies Config;

async function prerender(): Promise<string[]> {
  const episodes = await getEpisodeConfigs();

  return [
    "/",
    "/episodes",
    ...episodes.map(({ number }) => `/episodes/${number}`),
  ];
}
