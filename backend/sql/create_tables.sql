CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    video_id TEXT UNIQUE,
    title TEXT,
    upload_date DATE,
    premium BOOL
);

CREATE TABLE IF NOT EXISTS captions (
    id SERIAL PRIMARY KEY,
    vid_id INTEGER REFERENCES videos(id),
    time INT,
    text TEXT,
    search_vector tsvector
);

-- Updates a search vector to match text quicker for faster searching
CREATE OR REPLACE FUNCTION caption_search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', COALESCE(NEW.text, ''));
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- Apply autotrigger to any change made to the captions table
DROP TRIGGER IF EXISTS caption_search_vector_update_trigger ON captions;
CREATE TRIGGER caption_search_vector_update_trigger
BEFORE INSERT OR UPDATE ON captions
FOR EACH ROW EXECUTE FUNCTION caption_search_vector_update();

-- Add index to captions for faster queries via GIN 
CREATE INDEX IF NOT EXISTS caption_search_idx ON captions USING GIN (search_vector);

-- Add indicies to upload dates for binary tree search improvemnts for date ranges
CREATE INDEX IF NOT EXISTS videos_upload_date_idx ON videos (upload_date);

