import { redirect } from "react-router";
import { Episode, type EpisodeProps } from "../episodes/Episode";
import { getEpisodeConfigs } from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episode";
import { createPageTitle, DEFAULT_TITLE } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return createRouteMeta({
    title: data ? createPageTitle(data.episode.title) : DEFAULT_TITLE,
    description: data?.episode.summary,
    openGraphImage: data?.episode.openGraphImage,
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
    throw redirect("/episodes");
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
