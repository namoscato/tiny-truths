import { useWavesurfer } from "@wavesurfer/react";
import clsx from "clsx";
import { useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";
import { Copyright } from "./Copyright";
import styles from "./episodeContent.module.css";
import { FormattedTime } from "./FormattedTime";
import logoImg from "./images/logo.png";
import { PlayButton } from "./PlayButton";
import { RecordedDate } from "./RecordedDate";

interface Props {
  episode: EpisodeConfig;
  logoLink?: string;
}

const WAVESURFER_HEIGHT = 420;

const FEATURE_IMAGE_MAX_WIDTH = 475;

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
    height: WAVESURFER_HEIGHT,
  });

  const headerStyle = {
    ["--feature-image-max-height" as string]: `${Math.round(
      (episode.featureImage.height / episode.featureImage.width) *
        FEATURE_IMAGE_MAX_WIDTH,
    )}px`,
  } satisfies CSSProperties;

  const logo = <img src={logoImg} alt="Tiny Truths logo" width={469} />;

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <div className={styles.images}>
          <div className={styles.imageContainer}>
            {/* TODO: consolidate with EpisodeList */}
            {logoLink ? (
              <Link to={logoLink} className={styles.logoLink}>
                {logo}
              </Link>
            ) : (
              logo
            )}
          </div>
          <div className={styles.imageContainer}>
            <img
              src={episode.featureImage.url}
              alt={episode.featureImage.description ?? `${episode.title} image`}
              className={styles.featureImage}
            />
          </div>
        </div>
        <div
          className={styles.wavesurfer}
          style={{ marginTop: -1 * WAVESURFER_HEIGHT }}
          ref={containerRef}
        />
      </div>
      <main className={styles.content}>
        <div className={styles.controls}>
          <PlayButton
            wavesurfer={wavesurfer}
            isPlaying={isPlaying}
            episode={episode}
          />
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
        <h2>{episode.title}</h2>
        <p>{episode.summary}</p>
        <RecordedDate date={episode.date} />
        <Copyright episode={episode} />
      </main>
    </>
  );
};
