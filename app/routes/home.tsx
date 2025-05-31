import { Home } from "~/home/Home";
import {
  getEpisodeConfigs,
  type EpisodeConfig,
} from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/home";
import { DEFAULT_TITLE } from "./utils/createPageTitle";
import { createRouteMeta } from "./utils/createRouteMeta";

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return createRouteMeta({
    title: DEFAULT_TITLE,
    openGraphImage: data?.openGraphImage,
  });
}

export async function loader(): Promise<EpisodeConfig> {
  const episode = (await getEpisodeConfigs())[0];

  if (!episode) {
    throw new Response("Not Found", { status: 404 });
  }

  return episode;
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return <Home episode={loaderData} />;
}
