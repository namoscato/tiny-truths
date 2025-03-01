# Audio

## Generate Waveform

1. [Install `audiowaveform`](https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation):

   ```bash
   brew tap bbc/audiowaveform
   brew install audiowaveform
   ```

1. Generate JSON peaks:

   ```bash
   audiowaveform --input-filename episode1.mp3 --output-filename episode1.json --pixels-per-second 1 --bits 8
   ```
