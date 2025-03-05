import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js";
import styles from "./playButton.module.css";
import type { EpisodeConfig } from "./utils/getEpisodeConfigs";

interface Props {
  wavesurfer: WaveSurfer | null;
  isPlaying: boolean;
  episode: Pick<EpisodeConfig, "title" | "number">;
}

export const PlayButton = ({ wavesurfer, isPlaying, episode }: Props) => {
  const hasPlayed = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = !wavesurfer || isLoading;

  const playPause = useCallback(async () => {
    try {
      if (!wavesurfer) {
        throw new Error("Wavesurfer not initialized");
      }

      setIsLoading(true);
      await wavesurfer.playPause();

      if (!hasPlayed.current) {
        hasPlayed.current = true;
        window.goatcounter?.count({
          path: `episode_${episode.number}_start`,
          title: `Play ${episode.title}`,
          event: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [episode.number, episode.title, wavesurfer]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ("Space" === event.code) {
        event.preventDefault();
        void playPause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [playPause]);

  const title = isDisabled ? undefined : isPlaying ? "Pause" : "Play";

  return (
    <button
      className={clsx(styles.root, {
        [String(styles.disabled)]: isDisabled,
      })}
      onClick={() => void playPause()}
      title={title}
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
