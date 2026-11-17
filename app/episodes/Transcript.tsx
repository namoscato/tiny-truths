import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const wasOpen = useRef(false);

  const starts = useMemo(
    () => transcript.flatMap(({ cues }) => cues.map(({ start }) => start)),
    [transcript],
  );

  const activeIndex =
    currentTime > 0 ? findActiveIndex(starts, currentTime) : -1;

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = activeRef.current;
    const justOpened = isOpen && !wasOpen.current;
    wasOpen.current = isOpen;

    if (
      !isOpen ||
      !scroller ||
      !active ||
      (!justOpened &&
        Date.now() - lastManualScroll.current < MANUAL_SCROLL_PAUSE_MS)
    ) {
      return;
    }

    scroller.scrollTo({
      top: active.offsetTop - scroller.clientHeight / 3,
      // jump straight to the current line when the transcript is expanded
      behavior: justOpened || prefersReducedMotion() ? "instant" : "smooth",
    });
  }, [activeIndex, isOpen]);

  const handleManualScroll = () => {
    lastManualScroll.current = Date.now();
  };

  let cueIndex = 0;

  return (
    <details
      className={styles.root}
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className={styles.summary}>
        <ChevronRight className={styles.chevron} aria-hidden />
        Transcript
      </summary>
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
                      {" · "}
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
    </details>
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
