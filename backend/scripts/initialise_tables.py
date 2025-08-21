import os
import psycopg2
from dotenv import load_dotenv
from pathlib import Path

SQL_DIR = "../sql"

def main():
    load_dotenv()
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')

    sql_path = Path(SQL_DIR) / "create_tables.sql"

    with open(sql_path) as f:
        table_creation = f.read()

    conn = psycopg2.connect(database=DB_NAME, user=DB_USER)
    cur = conn.cursor()

    cur.execute(table_creation)

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
