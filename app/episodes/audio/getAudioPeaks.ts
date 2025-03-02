import episode1 from "./episode1.json";

const episodePeaks = [episode1];

export function getAudioPeaks(episodeNumber: number): number[][] {
  const peaks = episodePeaks[episodeNumber - 1];

  if (!peaks) {
    throw new Error(`No peaks for episode ${episodeNumber}`);
  }

  return [peaks.data];
}
