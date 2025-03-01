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
];
