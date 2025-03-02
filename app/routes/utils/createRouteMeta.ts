import type { MetaDescriptors } from "react-router/route-module";

const DEFAULT_DESCRIPTION = "An Amoscato podcast";

interface Dependencies {
  title: string;
  description?: string;
}

export function createRouteMeta({
  title,
  description = DEFAULT_DESCRIPTION,
}: Dependencies): MetaDescriptors {
  return [
    { title },
    { name: "description", content: description },
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
