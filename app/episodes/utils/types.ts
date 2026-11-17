export interface Audio {
  mp3Url: string;
  peaks: number[][];
}

export interface TranscriptCue {
  /** seconds */
  start: number;
  /** seconds */
  end: number;
  text: string;
}

export interface TranscriptParagraph {
  speaker: string | undefined;
  cues: TranscriptCue[];
}

export type Transcript = TranscriptParagraph[];
