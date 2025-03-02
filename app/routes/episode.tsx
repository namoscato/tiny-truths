import { Episode, type EpisodeProps } from "../episodes/Episode";
import { getEpisodeConfigs } from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episode";
import { createPageTitle } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return createRouteMeta({
    title: createPageTitle(data.episode.title),
    description: data.episode.summary,
  });
}

export async function loader({
  params,
}: Route.LoaderArgs): Promise<EpisodeProps> {
  const episodes = await getEpisodeConfigs();

  const episodeIndex = episodes.findIndex(
    ({ number }) => number === Number(params.number),
  );

  if (!episodes[episodeIndex]) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    episode: episodes[episodeIndex],
    previousNumber: episodes[episodeIndex + 1]?.number,
    nextNumber: episodes[episodeIndex - 1]?.number,
  };
}

export default function EpisodeRoute({ loaderData }: Route.ComponentProps) {
  return <Episode {...loaderData} />;
}
