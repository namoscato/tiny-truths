# Tiny Truths

Amoscato podcast website built with [React Router](https://reactrouter.com/).

## Setup

1. [Install `audiowaveform`](https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation) to generate audio waveforms:

   ```bash
   brew tap bbc/audiowaveform
   brew install audiowaveform
   ```

1. Install [VLC media player](https://www.videolan.org/vlc/) to convert audio

1. Install [ExifTool](https://exiftool.org/) to set image descriptions

## Development

### Add Episode

1. Add MP3 to [./public/episodes/audio/](./public/episodes/audio/) directory

1. Generate waveform peaks:

   ```bash
   EPISODE_NUMBER=1
   audiowaveform --input-filename ./public/episodes/audio/episode${EPISODE_NUMBER}.mp3 --output-filename ./app/episodes/waveforms/episode${EPISODE_NUMBER}.json --pixels-per-second 1 --bits 8
   ```

1. Add JSON data to [`episodePeaks` array](./app/episodes/waveforms/getAudioPeaks.ts)

1. Add WebM to [./public/episodes/audio/](./public/episodes/audio/), converted from MP3 via VLC

1. Add [compressed](https://tinypng.com/) feature image to [./public/episodes/images/](./public/episodes/images/) directory

1. Set feature image description metadata:

   ```bash
   exiftool -overwrite_original -ImageDescription="Giovanni with headphones" public/episodes/images/episode1.png
   ```

1. Add Open Graph image to [./public/episodes/images/](./public/episodes/images/) directory

1. Add entry to [`episodeConfigs` array](./app/episodes/utils/episodeConfigs.ts)
