# Transcoding WebM to MP4 using FFmpeg #

This guide demonstrates how to use FFmpeg to transcode WebM video files to MP4 format. FFmpeg is a powerful, open-source tool for handling multimedia data.

## Prerequisites #

- FFmpeg installed on your system. You can download it from [ffmpeg.org](https://ffmpeg.org/).

## Basic Command #

To transcode a WebM file to MP4, use the following command:

```bash
ffmpeg -i input.webm output.mp4
```

This command uses default settings for the output MP4 file.

## Advanced Command with Custom Settings #

For more control over the output, you can specify video and audio codecs, bitrates, and other parameters:

```bash
ffmpeg -i input.webm -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

Explanation of parameters:

- `-c:v libx264`: Sets the video codec to H.264
- `-crf 23`: Sets the Constant Rate Factor for video quality (lower values = higher quality)
- `-preset medium`: Balances encoding speed and compression efficiency
- `-c:a aac`: Sets the audio codec to AAC
- `-b:a 128k`: Sets the audio bitrate to 128 kbps

## Batch Processing #

To convert multiple WebM files in a directory, you can use a bash script:

```bash
#!/bin/bash
for file in *.webm
do
    ffmpeg -i "$file" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "${file%.webm}.mp4"
done
```

Save this script as `convert_webm_to_mp4.sh` and make it executable with `chmod +x convert_webm_to_mp4.sh`.

## Tips #

- Always test your FFmpeg commands on a single file before batch processing.
- Adjust the CRF value and preset to balance between quality and file size.
- Use the `-threads` option to specify the number of CPU threads to use for faster encoding.

Remember to respect copyright laws when transcoding video files.
