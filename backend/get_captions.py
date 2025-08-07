import os
import requests as rq
import json
import subprocess
import tempfile
import glob

LEMONADE_STAND_ID = "UCwVevVbti5Uuxj6Mkl5NHRA"
BASE_URL = (
    "https://youtube.googleapis.com/youtube/v3/search"
    "?key={key}&channelId={id}&part=snippet&order=date&type=video"
    "&videoDuration=long&maxResults=1"
)
VID_URL = "https://www.youtube.com/watch?v={vid_id}"

def main():
    GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']
    url = BASE_URL.format(key=GOOGLE_API_KEY, id=LEMONADE_STAND_ID)

    # output = rq.get(url)
    # data = output.json()["items"][0]

    with open("sample.json") as f:
        raw = json.load(f)

    data = raw["items"][0]
        
    video_id = data["id"]["videoId"]
    title = data["snippet"]["title"]
    publish_time = data["snippet"]["publishTime"]
    # channel_name = data["snippet"]["channelTitle"]
    date = publish_time[:10]

    print(f"Found Video Title: {title}")
    print(f"Found Video Date: {date}")
    print(f"Found Video ID: {video_id}")

    # with open("sample.json", "w") as file:
    #     json.dump(output.json(), file, indent = 4)

    video_url = VID_URL.format(vid_id=video_id)
    # vtt = get_subtitles(video_url)

    with open("sample.vtt") as f:
        vtt = f.read()

    # Parse the vtt file and store into data tables
    lines = vtt.split("\n")


## Tables
#
# 1. `videos` table: To hold information about each video.
#
# | Column | Data Type | Description |
# | :--- | :--- | :--- |
# | id | SERIAL PRIMARY KEY | Unique ID for each video. |
# | video_id | TEXT UNIQUE | The YouTube video ID (e.g., dQw4w9WgXcQ). |
# | title | TEXT | The video title. |
# | channel_name| TEXT | The name of the YouTube channel. |
# | upload_date | TIMESTAMP | When the video was published. |
# | premium | BOOL | True if the video is premium. |
#
#
# 2. `captions` table: To hold each individual line of the captions.
#
# | Column | Data Type | Description |
# | :--- | :--- | :--- |
# | id | SERIAL PRIMARY KEY | Unique ID for each caption line. |
# | video_id | INTEGER REFERENCES videos(id) | Foreign key linking to the videos table. |
# | start_time | FLOAT | Start time of the caption in seconds. |
# | end_time | FLOAT | End time of the caption in seconds. |
# | text | TEXT | The actual caption text. |
#
# Then, you would create a Full-Text Search index on the captions.text column.

def get_subtitles(video_url):
    if not is_tool("yt-dlp"):
        raise Exception("ERROR: Could not find yt-dlp cli tool...")

    with tempfile.TemporaryDirectory() as tmpdir:
        subprocess.run([
            "yt-dlp",
            "--skip-download",
            "--write-auto-sub",
            "--sub-langs", "en",
            "--sub-format", "vtt",
            "-P", tmpdir,
            video_url
        ], check=True)

        vtt_files = glob.glob(os.path.join(tmpdir, "*.en.vtt"))
        if not vtt_files:
            raise FileNotFoundError("Subtitle file not found.")

        with open(vtt_files[0], "r", encoding="utf-8") as f:
            subtitles = f.read()

        return subtitles

def is_tool(name):
    """Check whether `name` is on PATH and marked as executable."""
    from shutil import which
    return which(name) is not None

if __name__ == "__main__":
    main()
