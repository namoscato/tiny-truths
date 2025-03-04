import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import type WaveSurfer from "wavesurfer.js";
import styles from "./playButton.module.css";
import type { EpisodeConfig } from "./utils/getEpisodeConfigs";

interface Props {
  wavesurfer: WaveSurfer | null;
  isPlaying: boolean;
  episode: Pick<EpisodeConfig, "title">;
}

export const PlayButton = ({ wavesurfer, isPlaying, episode }: Props) => {
  const hasPlayed = useRef(false);

  const playPause = () => {
    wavesurfer?.playPause();

    if (!hasPlayed.current) {
      hasPlayed.current = true;
      window.goatcounter?.count({
        path: "episode_start",
        title: episode.title,
        event: true,
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ("Space" === event.code) {
        event.preventDefault();
        playPause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [wavesurfer]);

  return (
    <button
      className={styles.root}
      disabled={!wavesurfer}
      onClick={playPause}
      title={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
