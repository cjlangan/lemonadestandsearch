// download-yt-dlp.ts
import YTDlpWrap from 'yt-dlp-wrap';
import { chmodSync } from 'fs';

const binaryPath = './yt-dlp';

async function download() {
  await YTDlpWrap.downloadFromGithub(binaryPath); // Latest version for Linux
  chmodSync(binaryPath, 0o755); // Make it executable
  console.log(`yt-dlp binary downloaded and made executable at: ${binaryPath}`);
}

download().catch(console.error);

