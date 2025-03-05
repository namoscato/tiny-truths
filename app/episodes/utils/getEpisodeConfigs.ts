import { access } from "fs/promises";
import { join } from "path";
import { getAudioPeaks } from "../waveforms/getAudioPeaks";
import { episodeConfigs, type EpisodeConfigBase } from "./episodeConfigs";
import { loadExif } from "./loadExif";
import type { Audio } from "./types";

export interface EpisodeConfig extends EpisodeConfigBase {
  number: number;
  title: string;
  audio: Audio;
  featureImage: EpisodeConfigImage;
  openGraphImage: EpisodeConfigImage;
}

export interface EpisodeConfigImage {
  url: string;
  description?: string;
  width: number;
  height: number;
}

/**
 * Return all episodes in reverse chronological order.
 *
 * @param properties returned subset of episode properties; defaults to all
 */
export async function getEpisodeConfigs(): Promise<EpisodeConfig[]>;
export async function getEpisodeConfigs<T extends keyof EpisodeConfig>(
  properties: T[],
): Promise<Pick<EpisodeConfig, T>[]>;
export async function getEpisodeConfigs<T extends keyof EpisodeConfig>(
  properties?: T[],
): Promise<EpisodeConfig[] | Pick<EpisodeConfig, T>[]> {
  const configs: EpisodeConfig[] = [];

  for (const [index, episode] of episodeConfigs.entries()) {
    const number = 1 + index;

    configs.push({
      ...episode,
      number,
      title: titleFromNumber(number),
      audio: await audioFromNumber(number),
      featureImage: await imageFromName(`episode${number}.png`),
      openGraphImage: await imageFromName(`episode${number}-opengraph.jpg`),
    });
  }

  return configs.reverse().map<Pick<EpisodeConfig, T>>((config) => {
    if (!properties?.length) {
      return config;
    }

    return properties.reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: config[prop],
      }),
      {} as Pick<EpisodeConfig, T>,
    );
  });
}

function titleFromNumber(number: number): string {
  const numberString = String(number).padStart(2, "0");

  return `Episode ${numberString}`;
}

async function audioFromNumber(number: number): Promise<Audio> {
  const webmUrl = await audioUrlFromNumber(number, "webm");
  const mp3Url = await audioUrlFromNumber(number, "mp3");
  const peaks = getAudioPeaks(number);

  return { webmUrl, mp3Url, peaks };
}

async function audioUrlFromNumber(
  number: number,
  extension: "webm" | "mp3",
): Promise<string> {
  const url = `/episodes/audio/episode${number}.${extension}`;

  // assert file exists
  await access(getPublicURL(url));

  return url;
}

async function imageFromName(name: string): Promise<EpisodeConfigImage> {
  const url = `/episodes/images/${name}`;

  const image = await loadExif(getPublicURL(url));

  return { ...image, url };
}

function getPublicURL(path: string): URL {
  const relativeDir = import.meta.dirname.endsWith("/build/server")
    ? "../client"
    : "../../../public";

  return new URL(join(relativeDir, path), import.meta.url);
}
