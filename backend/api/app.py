from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor
from enum import Enum
from pathlib import Path
from dotenv import load_dotenv
import os

SQL_DIR = "../sql"
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://frontend:80", "http://localhost:3000"])

class Order(Enum):
    ASC = "asc"
    DESC = "desc"
    NONE = "none"

def get_connection():
    return psycopg2.connect(
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST', 'localhost'),  # fallback to localhost
        port=int(os.getenv('DB_PORT', 5432)),   # fallback to 5432
        cursor_factory=RealDictCursor
    )

@app.get("/api/search")
def search():
    q = request.args.get("q", "").strip()
    start_date = request.args.get("start")
    end_date = request.args.get("end")
    order = request.args.get("order", "best").lower()

    if not q:
        return jsonify({"error": "Missing query parameter 'q'"}), 400
    if not start_date:
        return jsonify({"error": "Missing parameter 'start_date'"}), 400
    if not end_date:
        return jsonify({"error": "Missing parameter 'end_date'"}), 400
    if order not in [o.value for o in Order]:
        order = "best"

    if order == "asc":
        order_sql = "ORDER BY v.upload_date ASC"
    elif order == "desc":
        order_sql = "ORDER BY v.upload_date DESC"
    elif order == "best":
        order_sql = "ORDER BY ts_rank(c.search_vector, plainto_tsquery('english', %s)) DESC"
    else:
        order_sql = ""

    sql_path = Path(SQL_DIR) / "search.sql"
    with open(sql_path) as f:
        sql = f.read().format(order_sql=order_sql)

    with get_connection() as conn:
        with conn.cursor() as cur:
            params = [q, q, start_date, end_date]  # default for asc/desc
            if order == "best":
                params.append(q)
            cur.execute(sql, params)
            results = cur.fetchall()

    return jsonify(results), 200

if __name__ == "__main__":
    app.run(debug=True)
