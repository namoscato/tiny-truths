---
name: add-episode
description: Add a new Tiny Truths podcast episode — audio, waveform peaks, feature and Open Graph images, and the episode config entry. Use when asked to add, publish, or set up a new episode.
---

# Add Episode

An episode's number is its 1-based position in the `episodeConfigs` array, so the new episode is `N = episodeConfigs.length + 1`. Every asset below is named after `N`, and the build fails if any is missing.

## Prerequisites

- [`audiowaveform`](https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation) to generate waveform peaks:

  ```bash
  brew tap bbc/audiowaveform
  brew install audiowaveform
  ```

- [VLC media player](https://www.videolan.org/vlc/) to convert MP3 to WebM
- [ExifTool](https://exiftool.org/) to set image descriptions

## Inputs

Ask the user for anything not provided:

- the episode MP3
- recording date
- one-sentence summary
- copyright credits (text and URL) beyond the theme song
- feature image and its description (used as alt text)
- Open Graph image

## Steps

1. Add the MP3 as `public/episodes/audio/episode${N}.mp3`.

1. Generate waveform peaks:

   ```bash
   N=1
   audiowaveform --input-filename ./public/episodes/audio/episode${N}.mp3 --output-filename ./app/episodes/waveforms/episode${N}.json --pixels-per-second 1 --bits 8
   ```

1. Import the new JSON and append it to the `episodePeaks` array in `app/episodes/waveforms/getAudioPeaks.ts`.

1. Add `public/episodes/audio/episode${N}.webm`, converted from the MP3 with VLC. The user does this step by hand.

1. Add a [compressed](https://tinypng.com/) feature image as `public/episodes/images/episode${N}.png`.

1. Set the feature image's description metadata:

   ```bash
   exiftool -overwrite_original -ImageDescription="Giovanni with headphones" public/episodes/images/episode${N}.png
   ```

1. Add the Open Graph image as `public/episodes/images/episode${N}-opengraph.jpg`.

1. Append an entry to the `episodeConfigs` array in `app/episodes/utils/episodeConfigs.ts`. Include the shared `themeSong` credit first in `copyright`.

## Verify

Run `npm run typecheck` and `npm run build`. The build checks that both audio files exist and reads each image's EXIF data, so it fails if an asset is missing or misnamed.
