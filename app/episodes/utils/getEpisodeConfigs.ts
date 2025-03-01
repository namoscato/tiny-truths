import { access } from "fs/promises";
import { join } from "path";
import { getAudioPeaks } from "../audio/getAudioPeaks";
import { episodes, type BaseEpisodeConfig } from "./episodes";
import type { Audio } from "./types";

export interface EpisodeConfig extends BaseEpisodeConfig {
  number: number;
  title: string;
  audio: Audio;
  // TODO image
}

/**
 * Return all episodes in reverse chronological order.
 */
export async function getEpisodeConfigs(): Promise<EpisodeConfig[]> {
  const configs: EpisodeConfig[] = [];

  for (const [index, episode] of episodes.entries()) {
    const number = 1 + index;

    const title = titleFromNumber(number);
    const audio = await audioFromNumber(number);

    configs.push({
      ...episode,
      number,
      title,
      audio,
    });
  }

  return configs.reverse();
}

function titleFromNumber(number: number): string {
  const numberString = String(number).padStart(2, "0");

  return `Episode ${numberString}`;
}

async function audioFromNumber(number: number): Promise<Audio> {
  const url = await audioUrlFromNumber(number);
  const peaks = getAudioPeaks(number);

  return { url, peaks };
}

async function audioUrlFromNumber(number: number): Promise<string> {
  const url = `/audio/episode${number}.webm`;

  await assertPublicFileExists(url);

  return url;
}

async function assertPublicFileExists(path: string) {
  const publicDir = import.meta.dirname.endsWith("/build/server")
    ? "../client"
    : "../../../public";

  await access(new URL(join(publicDir, path), import.meta.url));
}
