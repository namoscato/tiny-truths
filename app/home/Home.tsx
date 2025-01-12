import { useWavesurfer } from "@wavesurfer/react";
import clsx from "clsx";
import { useRef } from "react";
import styles from "./home.module.css";
import gioImg from "./images/gio.png";
import logoImg from "./images/logo.png";
import { PlayButton } from "./PlayButton";
import { formatTime } from "./utils/formatTime";
import type { Audio } from "./utils/types";

interface Props {
  audio: Audio;
}

const HEIGHT = 420;

export const Home = ({ audio }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audio.url,
    peaks: audio.peaks,
    barAlign: "bottom",
    barGap: 4,
    barWidth: 6,
    barRadius: 2,
    cursorColor: "#fcfafa",
    cursorWidth: 2,
    waveColor: "#c0f2e1",
    progressColor: "#fcfafa",
    height: HEIGHT,
  });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.images}>
          <div className={styles.logo}>
            <img src={logoImg} alt="Tiny Truths logo" width={469} />
          </div>
          <img
            src={gioImg}
            alt="Giovanni with headphones"
            width={475}
            className={styles.featureImage}
          />
        </div>
        <div
          className={styles.wavesurfer}
          style={{ marginTop: -1 * HEIGHT }}
          ref={containerRef}
        />
      </div>
      <main className={styles.content}>
        <div className={styles.controls}>
          <PlayButton wavesurfer={wavesurfer} isPlaying={isPlaying} />
          <div className={styles.time}>
            <span
              className={clsx({
                [styles.timeStarted]: currentTime,
                [styles.timeActive]: isPlaying,
              })}
            >
              {formatTime(currentTime)}
            </span>
            &nbsp;/&nbsp;
            {formatTime(wavesurfer?.getDuration())}
          </div>
        </div>
        <h2>Episode 01</h2>
        <p>
          Giovanni introduces himself, talks about some of his favorite things,
          reflects on the Christmas season, and shares some words of wisdom for
          the New Year.
        </p>
        <p className={styles.subtitle}>Recorded December 30, 2024</p>
      </main>
    </>
  );
};
