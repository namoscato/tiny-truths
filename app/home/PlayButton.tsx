import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import type WaveSurfer from "wavesurfer.js";
import styles from "./playButton.module.css";

interface Props {
  wavesurfer: WaveSurfer | null;
  isPlaying: boolean;
}

export const PlayButton = ({ wavesurfer, isPlaying }: Props) => {
  const playPause = () => {
    wavesurfer?.playPause();
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
