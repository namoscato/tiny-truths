import episode1 from "./episode1.json";
import episode2 from "./episode2.json";
import episode3 from "./episode3.json";

const episodePeaks = [episode1, episode2, episode3];

export function getAudioPeaks(episodeNumber: number): number[][] {
  const peaks = episodePeaks[episodeNumber - 1];

  if (!peaks) {
    throw new Error(`No peaks for episode ${episodeNumber}`);
  }

  return [peaks.data];
}
