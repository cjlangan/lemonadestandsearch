import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_API_KEY;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CHANNEL_ID = process.env.CHANNEL_ID;
const YOUTUBE_API = 'https://youtube.googleapis.com/youtube/v3/';

export async function GET() {
    try {
        const latestVideoRes = await fetch(
            `${YOUTUBE_API}/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video`
        );
        const latestVideoData = await latestVideoRes.json();

        console.log(latestVideoData);

        const videoId = latestVideoData.items?.[0]?.id?.videoId;

        if(!videoId) {
            return NextResponse.json({ error: 'No video found' }, { status: 404 });
        }

        return NextResponse.json({ videoId });
        
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
