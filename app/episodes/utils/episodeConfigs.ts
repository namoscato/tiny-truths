export interface EpisodeConfigBase {
  date: Date;
  summary: string;
}

export const episodeConfigs: EpisodeConfigBase[] = [
  {
    date: new Date("2024-12-30"),
    summary:
      "Giovanni introduces himself, talks about some of his favorite things, reflects on the Christmas season, and shares some words of wisdom for the New Year.",
  },
  {
    date: new Date("2025-02-26"),
    summary:
      "Giovanni shares his excitement about becoming a big brother, sings a heartfelt song for Melody, and reads one of his favorite books.",
  },
];
