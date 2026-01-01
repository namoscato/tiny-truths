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
  {
    date: new Date("2025-05-14"),
    summary:
      'Giovanni reads from his "I Spy" book, reflects on a road trip to Connecticut, and sings more of his favorite songs.',
    copyright: [
      themeSong,
      {
        text: "Yo-Yo Ma",
        url: "https://youtu.be/1prweT95Mo0?si=wqx7vM7zWEb4PXyg",
      },
    ],
  },
  {
    date: new Date("2025-07-16"),
    summary:
      "Giovanni reflects on a trip to the dentist, learns his family members' first names, and sings one of his favorite summer rock songs.",
    copyright: [
      themeSong,
      {
        text: "Chicago",
        url: "https://youtu.be/HjylD7esXDo?si=rcdhuT2PdBKWapU-",
      },
    ],
  },
  {
    date: new Date("2025-12-03"),
    summary:
      "Giovanni describes holiday traditions, talks about his friends at school, and gives advice for living a healthy New Year.",
    copyright: [
      themeSong,
      {
        text: "Bobby Helms",
        url: "https://youtu.be/fyEAX7Cd3OE?si=6Wi8Kwh8RmjwpWTJ",
      },
    ],
  },
];
