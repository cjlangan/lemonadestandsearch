# Lemonade Stand Search

### Find any bit that you remember

## Setup

- Postgresql database stored on Oracle Server
- Backend server script to download vtt caption files
- Backend server script to convert vtt file to storable data in database tables
- Pythons Flask as a backend API to interact with the database
- HTML and Javascript frontend that uses the API to search for bits

## Tables

1. `videos` table: To hold information about each video.

| Column | Data Type | Description |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | Unique ID for each video. |
| video_id | TEXT UNIQUE | The YouTube video ID (e.g., dQw4w9WgXcQ). |
| title | TEXT | The video title. |
| channel_name| TEXT | The name of the YouTube channel. |
| upload_date | TIMESTAMP | When the video was published. |


2. `captions` table: To hold each individual line of the captions.

| Column | Data Type | Description |
| :--- | :--- | :--- |
| id | SERIAL PRIMARY KEY | Unique ID for each caption line. |
| video_id | INTEGER REFERENCES videos(id) | Foreign key linking to the videos table. |
| start_time | FLOAT | Start time of the caption in seconds. |
| end_time | FLOAT | End time of the caption in seconds. |
| text | TEXT | The actual caption text. |

Then, you would create a Full-Text Search index on the captions.text column.

