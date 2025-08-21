from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor
from enum import Enum
from pathlib import Path
import os

SQL_DIR = "../sql"

app = Flask(__name__)

class Order(Enum):
    ASC = "asc"
    DESC = "desc"
    NONE = "none"

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

    if not q:
        return jsonify({"error": "Missing query parameter 'q'"}), 400
    if not start_date:
        return jsonify({"error": "Missing parameter 'start_date'"}), 400
    if not end_date:
        return jsonify({"error": "Missing parameter 'end_date'"}), 400
    if order not in [o.value for o in Order]:
        return jsonify({"error": f"Invalid order. Must be one of {[o.value for o in Order]}"}), 400

    if order == "asc":
        order_sql = "ORDER BY v.upload_date ASC"
    elif order == "desc":
        order_sql = "ORDER BY v.upload_date DESC"
    else:
        order_sql = ""

    sql_path = Path(SQL_DIR) / "search.sql"
    with open(sql_path) as f:
        sql = f.read().format(order_sql=order_sql)

    with get_connection() as conn:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, (q, q, start_date, end_date))
            results = cur.fetchall()

    return jsonify(results), 200

if __name__ == "__main__":
    app.run(debug=True)
