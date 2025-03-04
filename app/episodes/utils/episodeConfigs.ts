export interface EpisodeConfigBase {
  date: Date;
  summary: string;
  copyright: EpisodeConfigCopyright[];
}

interface EpisodeConfigCopyright {
  text: string;
  url: string;
}

const themeSong: EpisodeConfigCopyright = {
  text: "Suno",
  url: "https://suno.com/song/c67faa39-2a0a-42cd-80e0-f00bf296bd05?sh=mlskjsh5pwGGROrW",
};

export const episodeConfigs: EpisodeConfigBase[] = [
  {
    date: new Date("2024-12-30"),
    summary:
      "Giovanni introduces himself, talks about some of his favorite things, reflects on the Christmas season, and shares some words of wisdom for the New Year.",
    copyright: [themeSong],
  },
  {
    date: new Date("2025-02-26"),
    summary:
      "Giovanni shares his excitement about becoming a big brother, sings a heartfelt song for Melody, and reads one of his favorite books.",
    copyright: [
      themeSong,
      {
        text: "Pinkfong",
        url: "https://youtu.be/XqZsoesa55w?si=TwCNvYgFXTY260tj",
      },
    ],
  },
];
