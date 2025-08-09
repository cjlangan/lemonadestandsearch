from flask import Flask, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)

def get_connection():
    return psycopg2.connect(
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        cursor_factory=RealDictCursor
    )

@app.get("/api/search")
def search():
    q = request.args.get("q", "").strip()
    start_date = request.args.get("start")
    end_date = request.args.get("end")
    order = request.args.get("order", "none").lower()

    if not q or not start_date or not end_date:
        return jsonify({"error": "Missing required parameters."})

    if order == "asc":
        order_sql = "ORDER BY v.upload_date ASC"
    elif order == "desc":
        order_sql = "ORDER BY v.upload_date DESC"
    else:
        order_sql = ""

    sql = f"""
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
        LIMIT 50
    """

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (q, q, start_date, end_date))
            results = cur.fetchall()

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
