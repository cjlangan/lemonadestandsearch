import fs from 'fs';
import YTDlpWrap from 'yt-dlp-wrap';

const ytDlpWrap = new YTDlpWrap('./yt-dlp');

function downloadCaptions(url: string, filename: string) {
    const stream = ytDlpWrap.execStream([
        url,
        '--skip-download', 
        '--write-auto-sub',
        '--sub-langs', 'en',
        '--sub-format', 'vtt'
    ]);

    const defaultFilename = "-.en.vtt";

    stream.on('end', () => {
        fs.rename(defaultFilename, filename, (err) => {
            if(err) {
                console.error('❌ Error while renaming captions file:', err);
            } else {
                console.log('✅ Captions download complete:')
            }
        });
    });

    stream.on('error', (err) => console.error('❌ Error while downloading captions:', err));
}

downloadCaptions('https://www.youtube.com/watch?v=LYIpxnEDwp0', 'captions.vtt');

