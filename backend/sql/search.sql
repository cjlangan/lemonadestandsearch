SELECT
    v.video_id,
    v.title,
    TO_CHAR(v.upload_date, 'YYYY-MM-DD') AS upload_date,
    c.time,
    ts_headline(
        'english',
        c.text,
        plainto_tsquery('english', %s),
        'StartSel=<b>, StopSel=</b>, MinWords=20, MaxWords=40, MaxFragments=1'
    ) AS hl_text
FROM captions c
JOIN videos v ON c.vid_id = v.id
WHERE c.search_vector @@ plainto_tsquery('english', %s)
  AND v.upload_date BETWEEN %s AND %s
{order_sql}
LIMIT 50;
