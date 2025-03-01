import { Episode, type EpisodeProps } from "../episodes/Episode";
import { getEpisodeConfigs } from "../episodes/utils/getEpisodeConfigs";
import type { Route } from "../routes/+types/episode";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "Tiny Truths" },
    { name: "description", content: "An Amoscato podcast" },
    // {
    //   property: "og:image",
    //   content: "https://podcast.tesinandnick.com/opengraph-image.jpg",
    // },
    // {
    //   property: "og:image:width",
    //   content: "1200",
    // },
    // {
    //   property: "og:image:height",
    //   content: "630",
    // },
    // {
    //   property: "og:image:type",
    //   content: "image/jpeg",
    // },
  ];
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
