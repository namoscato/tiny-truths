import type { MetaDescriptors } from "react-router/route-module";
import type { EpisodeConfigImage } from "~/episodes/utils/getEpisodeConfigs";

const DEFAULT_DESCRIPTION = "An Amoscato podcast";

interface Dependencies {
  title: string;
  description?: string;
  openGraphImage?: EpisodeConfigImage;
}

export function createRouteMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  openGraphImage = {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
  },
}: Dependencies): MetaDescriptors {
  return [
    { title },
    { name: "description", content: description },
    {
      property: "og:image",
      content: `https://podcast.tesinandnick.com${openGraphImage.url}`,
    },
    {
      property: "og:image:width",
      content: openGraphImage.width,
    },
    {
      property: "og:image:height",
      content: openGraphImage.height,
    },
    {
      property: "og:image:type",
      content: "image/jpeg",
    },
  ];
}
