import { access, readFile } from "fs/promises";
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
  const peaks = await audioPeaksFromNumber(number);

  return { url, peaks };
}

async function audioUrlFromNumber(number: number): Promise<string> {
  const url = `/audio/episode${number}.webm`;

  // assert file exists
  await access(new URL(`../../../public${url}`, import.meta.url));

  return url;
}

async function audioPeaksFromNumber(number: number): Promise<number[][]> {
  const buffer = await readFile(
    new URL(`../audio/episode${number}.json`, import.meta.url),
  );
  const waveform = JSON.parse(buffer.toString());

  return [waveform.data];
}
