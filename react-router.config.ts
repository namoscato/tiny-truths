import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

export default {
  buildEnd: createBuildEnd(),
  prerender,
  ssr: false,
} satisfies Config;

function createBuildEnd(): Config["buildEnd"] {
  if (process.env.SENTRY_AUTH_TOKEN) {
    // TODO: remove type assertion
    // https://github.com/getsentry/sentry-javascript/pull/15583
    return sentryOnBuildEnd as Config["buildEnd"];
  }
}

async function prerender(): Promise<string[]> {
  const episodes = await getEpisodeConfigs();

  return [
    "/",
    "/episodes",
    ...episodes.map(({ number }) => `/episodes/${number}`),
  ];
}
