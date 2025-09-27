import { useEffect } from "react";
import { redirect, useNavigate, type Register } from "react-router";
import { Episode, type EpisodeProps } from "../episodes/Episode";
import { getEpisodeConfigs } from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episode";
import { createPageTitle, DEFAULT_TITLE } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta({ loaderData }: Route.MetaArgs): Route.MetaDescriptors {
  return createRouteMeta({
    title: loaderData
      ? createPageTitle(loaderData.episode.title)
      : DEFAULT_TITLE,
    description: loaderData?.episode.summary,
    openGraphImage: loaderData?.episode.openGraphImage,
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
    throw redirect("/episodes" satisfies RoutePath);
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

export function ErrorBoundary() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate("/episodes" satisfies RoutePath, { replace: true });
  }, [navigate]);

  return null;
}

type RoutePath = keyof Register["pages"];
