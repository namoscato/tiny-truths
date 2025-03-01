import { useWavesurfer } from "@wavesurfer/react";
import clsx from "clsx";
import { useRef } from "react";
import { Link } from "react-router";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";
import { FormattedTime } from "./FormattedTime";
import { PlayButton } from "./PlayButton";
import styles from "./episodeContent.module.css";
import logoImg from "./images/logo.png";

interface Props {
  episode: EpisodeConfig;
  logoLink?: string;
}

const HEIGHT = 420;

export const EpisodeContent = ({ episode, logoLink }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: episode.audio.url,
    peaks: episode.audio.peaks,
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

  const logo = <img src={logoImg} alt="Tiny Truths logo" width={469} />;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.images}>
          <div className={styles.logo}>
            {/* TODO: consolidate with EpisodeList */}
            {logoLink ? (
              <Link to={logoLink} className={styles.logoLink}>
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>
          <img
            src={episode.image.url}
            alt={episode.image.alt}
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
                [String(styles.timeStarted)]: currentTime,
                [String(styles.timeActive)]: isPlaying,
              })}
            >
              <FormattedTime>{currentTime}</FormattedTime>
            </span>
            &nbsp;/&nbsp;
            <FormattedTime>{wavesurfer?.getDuration()}</FormattedTime>
          </div>
        </div>
        {/* TODO: consolidate with EpisodeList */}
        <h2>{episode.title}</h2>
        <p>{episode.summary}</p>
        <p className={styles.subtitle}>
          Recorded{" "}
          {episode.date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </main>
    </>
  );
};
