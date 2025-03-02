import { access } from "fs/promises";
import { join } from "path";
import { getAudioPeaks } from "../audio/getAudioPeaks";
import { episodeConfigs, type EpisodeConfigBase } from "./episodeConfigs";
import { loadExif } from "./loadExif";
import type { Audio } from "./types";

export interface EpisodeConfig extends EpisodeConfigBase {
  number: number;
  title: string;
  audio: Audio;
  image: EpisodeConfigImage;
}

interface EpisodeConfigImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Return all episodes in reverse chronological order.
 */
export async function getEpisodeConfigs(): Promise<EpisodeConfig[]> {
  const configs: EpisodeConfig[] = [];

  for (const [index, episode] of episodeConfigs.entries()) {
    const number = 1 + index;

    configs.push({
      ...episode,
      number,
      title: titleFromNumber(number),
      audio: await audioFromNumber(number),
      image: await imageFromNumber(number),
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

  // assert file exists
  await access(getPublicURL(url));

  return url;
}

async function imageFromNumber(number: number): Promise<EpisodeConfigImage> {
  const url = `/images/episode${number}.png`;

  const { width, height, description } = await loadExif(getPublicURL(url));

  return {
    url,
    alt: description ?? `Episode ${number} image`,
    width,
    height,
  };
}

function getPublicURL(path: string): URL {
  const relativeDir = import.meta.dirname.endsWith("/build/server")
    ? "../client"
    : "../../../public";

  return new URL(join(relativeDir, path), import.meta.url);
}
