import type { Config } from "@react-router/dev/config";
import { getEpisodeConfigs } from "./app/episodes/utils/getEpisodeConfigs";

export default {
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
