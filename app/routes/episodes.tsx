import { EpisodeList, type EpisodeListConfig } from "~/episodes/EpisodeList";
import { getEpisodeConfigs } from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episodes";
import { createPageTitle } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta(): Route.MetaDescriptors {
  return createRouteMeta({
    title: createPageTitle("Episodes"),
  });
}

export async function loader(): Promise<EpisodeListConfig[]> {
  return await getEpisodeConfigs(["number", "title", "summary", "date"]);
}

export default function EpisodesRoute({ loaderData }: Route.ComponentProps) {
  return <EpisodeList episodes={loaderData} />;
}
