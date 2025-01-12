import episode1Waveform from "../audio/episode1.json";
import episode1Url from "../audio/episode1.webm?url";
import { Home } from "../home/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tiny Truths" },
    { name: "description", content: "An Amoscato Podcast" },
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

export async function loader({}: Route.LoaderArgs) {
  return {
    url: episode1Url,
    peaks: [episode1Waveform.data],
  };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  return <Home audio={loaderData} />;
}
