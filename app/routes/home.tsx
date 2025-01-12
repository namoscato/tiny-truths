import episode1Waveform from "../audio/episode1.json";
import episode1Url from "../audio/episode1.webm?url";
import { Home } from "../home/Home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tiny Truths" },
    { name: "description", content: "An Amoscato Podcast" },
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
