import { Home } from "~/home/Home";
import {
  getEpisodeConfigs,
  type EpisodeConfig,
} from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/home";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Tiny Truths" },
    { name: "description", content: "An Amoscato podcast" },
    {
      property: "og:image",
      content: "https://podcast.tesinandnick.com/opengraph-image.jpg",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:type",
      content: "image/jpeg",
    },
  ];
}

export async function loader({}: Route.LoaderArgs): Promise<EpisodeConfig> {
  const episode = (await getEpisodeConfigs())[0];

  if (!episode) {
    throw new Response("Not Found", { status: 404 });
  }

  return episode;
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return <Home episode={loaderData} />;
}
