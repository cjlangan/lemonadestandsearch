import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from pathlib import Path
import time

SQL_DIR = "../sql"

def main():
    load_dotenv()

    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_HOST = os.getenv('DB_HOST', 'localhost')  # fallback to localhost
    DB_PORT = int(os.getenv('DB_PORT', 5432))    # fallback to 5432

    sql_path = Path(SQL_DIR) / "create_tables.sql"

    with open(sql_path) as f:
        table_creation = f.read()

    retries = 10
    while retries:
        try:
            conn = psycopg2.connect(
                database=DB_NAME,
                user=DB_USER,
                password=DB_PASSWORD,
                host=DB_HOST,
                port=DB_PORT,
                cursor_factory=RealDictCursor
            )
            break
        except psycopg2.OperationalError:
            retries -= 1
            print("Postgres not ready, waiting 2s...")
            time.sleep(2)
    else:
        raise Exception("Cannot connect to Postgres")

    cur = conn.cursor()
    cur.execute(table_creation)
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
