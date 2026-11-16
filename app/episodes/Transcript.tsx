import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import type WaveSurfer from "wavesurfer.js";
import { FormattedTime } from "./FormattedTime";
import styles from "./transcript.module.css";
import type { Transcript as TranscriptData } from "./utils/types";

interface Props {
  transcript: TranscriptData;
  wavesurfer: WaveSurfer | null;
  currentTime: number;
}

/** Pause auto-scroll for this long after the listener scrolls by hand. */
const MANUAL_SCROLL_PAUSE_MS = 5000;

export const Transcript = ({ transcript, wavesurfer, currentTime }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const lastManualScroll = useRef(0);

  const starts = useMemo(
    () => transcript.flatMap(({ cues }) => cues.map(({ start }) => start)),
    [transcript],
  );

  const activeIndex =
    currentTime > 0 ? findActiveIndex(starts, currentTime) : -1;

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = activeRef.current;

    if (
      !scroller ||
      !active ||
      Date.now() - lastManualScroll.current < MANUAL_SCROLL_PAUSE_MS
    ) {
      return;
    }

    scroller.scrollTo({
      top: active.offsetTop - scroller.clientHeight / 3,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [activeIndex]);

  const handleManualScroll = () => {
    lastManualScroll.current = Date.now();
  };

  let cueIndex = 0;

  return (
    <section className={styles.root} aria-labelledby="transcript-heading">
      <h3 id="transcript-heading" className={styles.heading}>
        Transcript
      </h3>
      <div
        ref={scrollerRef}
        className={styles.scroller}
        onWheel={handleManualScroll}
        onTouchMove={handleManualScroll}
        onKeyDown={handleManualScroll}
      >
        {transcript.map(({ speaker, cues }) => {
          const firstCue = cues[0];

          return (
            <p key={firstCue?.start} className={styles.paragraph}>
              {speaker && (
                <span className={styles.speaker}>
                  {speaker}
                  {firstCue && (
                    <span className={styles.timestamp}>
                      <FormattedTime>{firstCue.start}</FormattedTime>
                    </span>
                  )}
                </span>
              )}
              {cues.map((cue) => {
                const index = cueIndex++;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={cue.start}
                    ref={isActive ? activeRef : undefined}
                    type="button"
                    className={clsx(styles.cue, {
                      [String(styles.cueActive)]: isActive,
                      [String(styles.cuePast)]: index < activeIndex,
                    })}
                    aria-current={isActive ? "true" : undefined}
                    disabled={!wavesurfer}
                    onClick={() => wavesurfer?.setTime(cue.start)}
                  >
                    {cue.text}
                  </button>
                );
              })}
            </p>
          );
        })}
      </div>
    </section>
  );
};

/** Index of the last cue that started at or before `time`. */
function findActiveIndex(starts: number[], time: number): number {
  let low = 0;
  let high = starts.length - 1;
  let result = -1;

  while (low <= high) {
    const mid = (low + high) >> 1;

    if ((starts[mid] ?? Infinity) <= time) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
