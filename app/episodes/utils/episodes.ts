export interface BaseEpisodeConfig {
  date: Date;
  summary: string;
}

export const episodes: BaseEpisodeConfig[] = [
  {
    date: new Date("2024-12-30"),
    summary:
      "Giovanni introduces himself, talks about some of his favorite things, reflects on the Christmas season, and shares some words of wisdom for the New Year.",
  },
];
