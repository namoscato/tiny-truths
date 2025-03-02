import { EpisodeList } from "~/episodes/EpisodeList";
import {
  getEpisodeConfigs,
  type EpisodeConfig,
} from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episodes";
import { createPageTitle } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return createRouteMeta({
    title: createPageTitle("Episodes"),
  });
}

export async function loader({}: Route.LoaderArgs): Promise<EpisodeConfig[]> {
  return await getEpisodeConfigs();
}

export default function EpisodesRoute({ loaderData }: Route.ComponentProps) {
  return <EpisodeList episodes={loaderData} />;
}
