import type { Transcript, TranscriptParagraph } from "./types";

const TIMING_PATTERN =
  /^((?:\d+:)?\d{2}:\d{2}\.\d{3})\s+-->\s+((?:\d+:)?\d{2}:\d{2}\.\d{3})/;

const SPEAKER_PATTERN = /^([^:]{1,40}):\s+(.*)$/s;

/**
 * Parse a Descript WebVTT subtitle export into paragraphs of consecutive cues
 * from the same speaker. Descript prefixes a cue's text with "Speaker: " only
 * when the speaker changes, so the speaker carries forward otherwise.
 */
export function parseTranscript(vtt: string): Transcript {
  const paragraphs: TranscriptParagraph[] = [];
  let speaker: string | undefined;

  for (const block of vtt.replace(/\r\n?/g, "\n").split(/\n{2,}/)) {
    const lines = block.trim().split("\n");
    const timingIndex = lines.findIndex((line) => TIMING_PATTERN.test(line));
    const timing = lines[timingIndex]?.match(TIMING_PATTERN);

    if (!timing?.[1] || !timing[2]) {
      continue; // header, NOTE, STYLE, or REGION block
    }

    let text = stripTags(lines.slice(timingIndex + 1).join(" ")).trim();

    const speakerMatch = text.match(SPEAKER_PATTERN);
    if (speakerMatch?.[1] && speakerMatch[2]) {
      speaker = speakerMatch[1].trim();
      text = speakerMatch[2].trim();
    }

    if (!text) {
      continue;
    }

    const cue = {
      start: parseTimestamp(timing[1]),
      end: parseTimestamp(timing[2]),
      text,
    };

    const previous = paragraphs.at(-1);
    if (previous && previous.speaker === speaker) {
      previous.cues.push(cue);
    } else {
      paragraphs.push({ speaker, cues: [cue] });
    }
  }

  return paragraphs;
}

function parseTimestamp(timestamp: string): number {
  return timestamp
    .split(":")
    .reduce((total, part) => total * 60 + Number(part), 0);
}

function stripTags(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}
