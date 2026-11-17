import { captureException } from "@sentry/react-router";
import { useWavesurfer } from "@wavesurfer/react";
import clsx from "clsx";
import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router";
import type { EpisodeConfig } from "~/episodes/utils/getEpisodeConfigs";
import { Copyright } from "./Copyright";
import styles from "./episodeContent.module.css";
import { FormattedTime } from "./FormattedTime";
import logoImg from "./images/logo.png";
import { PlayButton } from "./PlayButton";
import { RecordedDate } from "./RecordedDate";
import { Transcript } from "./Transcript";

interface Props {
  episode: EpisodeConfig;
  logoLink?: string;
}

const WAVESURFER_HEIGHT = 420;

const FEATURE_IMAGE_MAX_WIDTH = 475;

export const EpisodeContent = ({ episode, logoLink }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    // WaveSurfer instance will only be instantiated once `containerRef` is defined,
    // at which point `audioRef` should also be defined:
    // https://github.com/katspaugh/wavesurfer-react/blob/1.0.11/src/index.tsx#L46-L51
    // eslint-disable-next-line react-hooks/refs
    media: audioRef.current ?? undefined,
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

  useEffect(() => {
    return wavesurfer?.on("error", (error) => {
      captureException(error);
    });
  }, [wavesurfer]);

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
              <Link
                to={logoLink}
                className={styles.logoLink}
                prefetch="viewport"
              >
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
        {/*
          MP3 must come first. The WebM files are Vorbis, which iOS Safari
          claims to support (so it picks WebM over MP3) but can't actually
          play: audio stops after a moment while `currentTime` keeps advancing.
        */}
        <audio key={episode.audio.mp3Url} ref={audioRef}>
          <source src={episode.audio.mp3Url} type="audio/mpeg" />
          <source src={episode.audio.webmUrl} type="audio/webm" />
        </audio>
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
        {episode.transcript && (
          <Transcript
            transcript={episode.transcript}
            wavesurfer={wavesurfer}
            currentTime={currentTime}
          />
        )}
      </main>
    </>
  );
};
