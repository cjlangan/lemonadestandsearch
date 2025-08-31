import os
import requests as rq
import json
import html
import subprocess
import tempfile
import glob
import webvtt
import psycopg2
from pathlib import Path
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

LEMONADE_STAND_ID = "UCwVevVbti5Uuxj6Mkl5NHRA"
BASE_URL = (
    "https://youtube.googleapis.com/youtube/v3/search"
    "?key={key}&channelId={id}&part=snippet&order=date&type=video"
    "&videoDuration=long&maxResults=1"
)
VID_URL = "https://www.youtube.com/watch?v={vid_id}"

def main():
    load_dotenv()

    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST', 'localhost')  # fallback to localhost
    DB_PORT = int(os.getenv('DB_PORT', 5432))    # fallback to 5432
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

    url = BASE_URL.format(key=GOOGLE_API_KEY, id=LEMONADE_STAND_ID)

    output = rq.get(url)
    data = output.json()["items"][0]

    # BASE_DIR = Path(__file__).parent
    # json_path = BASE_DIR / "sample.json"
    # with open(json_path) as f:
    #     raw = json.load(f)
    # data = raw["items"][0]

    video_id = data["id"]["videoId"]
    title = html.unescape(data["snippet"]["title"])
    publish_time = data["snippet"]["publishTime"]
    date = publish_time[:10]

    # with open("sample.json", "w") as file:
    #     json.dump(output.json(), file, indent = 4)

    video_url = VID_URL.format(vid_id=video_id)
    vtt = get_subtitles(video_url)

    # vtt_path = BASE_DIR / "sample.vtt"
    # with open(vtt_path) as f:
    #     vtt = f.read()

    snippets = parse_vtt(vtt)

    conn = psycopg2.connect(
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        cursor_factory=RealDictCursor
    )
    cur = conn.cursor()

    # Check if video has already been processed
    cur.execute("SELECT id FROM videos WHERE video_id = %s", (video_id,))
    row = cur.fetchone()
    if row:
        print(f"Video {video_id} already in DB, skipping")
        cur.close()
        conn.close()
        return  # exit early

    # Process new video
    cur.execute("""INSERT INTO videos (video_id, title, upload_date, premium) VALUES
        (%s, %s, %s, %s)
        RETURNING id
    """, (video_id, title, date, False))

    row = cur.fetchone()  
    video_db_id = row['id']

    for snippet in snippets:
        cur.execute("""insert into captions (vid_id, time, text) values
            (%s, %s, %s)
        """, (video_db_id, snippet[0], snippet[1]))

    conn.commit()
    cur.close()
    conn.close()

def time_str_to_seconds(time_str):
    """
    Convert a time string "HH:MM:SS.mmm" to total seconds.
    
    Example:
        "01:49:53.280" -> 6593 seconds
    """
    parts = time_str.split(':')
    if len(parts) != 3:
        raise ValueError("Time string must be in HH:MM:SS.mmm format")

    hours = int(parts[0])
    minutes = int(parts[1])
    seconds = int(parts[2].split('.')[0])

    total_seconds = hours * 3600 + minutes * 60 + seconds
    return total_seconds

def parse_vtt(vtt):
    SPACING = 4 # space between useful lines
    cap_idx = 0
    lines = []
    LINES_PER_TEXT = 3
    curr_idx = -1
    texts = []

    for caption in webvtt.from_string(vtt):
        if cap_idx % SPACING == 1:
            lines.append([time_str_to_seconds(caption.start), 
                html.unescape(caption.text.strip().replace("\n", " "))])
        cap_idx += 1

    # Combine 3 consecutive lines to create 1 text
    for i, line in enumerate(lines):
        if i % LINES_PER_TEXT == 0:
            texts.append([line[0], ""])
            curr_idx += 1
        texts[curr_idx][1] += line[1] + " "

    return texts

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
