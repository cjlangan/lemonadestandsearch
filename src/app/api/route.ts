import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;
const YOUTUBE_API = 'https://youtube.googleapis.com/youtube/v3/';
const ADDONS = 'order=date&maxResults=1&type=video';
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET() {
    try {
        const latestVideoRes = await fetch(
            `${YOUTUBE_API}/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&${ADDONS}`
        );
        const latestVideoData = await latestVideoRes.json();


        const videoId = latestVideoData.items?.[0]?.id?.videoId;


        if(!videoId) {
            return NextResponse.json({ error: 'No video found' }, { status: 404 });
        }

        console.log(latestVideoData);
        console.log(videoId);

        return NextResponse.json({ videoId });
        
    } catch(err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
