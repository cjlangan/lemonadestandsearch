import YTDlpWrap from 'yt-dlp-wrap';
import { createWriteStream } from 'fs';

const ytDlpWrap = new YTDlpWrap('./yt-dlp');

async function downloadVideo(url: string, outputFile: string) {
    const stream = ytDlpWrap.execStream([
        url,
        '-f', 'best[ext=mp4]',
        '-o', '-' // output to stdout
    ]);

    stream.pipe(createWriteStream(outputFile));

    stream.on('end', () => console.log('✅ Download complete:', outputFile));
    stream.on('error', (err) => console.error('❌ Error:', err));
}

downloadVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video.mp4');
