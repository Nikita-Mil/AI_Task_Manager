#!/usr/bin/env python3
"""
Скрипт экспорта задач из PostgreSQL в CSV-файл.
"""

import csv
import os
import sys
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
ENV_PATH = PROJECT_ROOT / 'server' / '.env'
OUTPUT_FILE = PROJECT_ROOT / 'tasks.csv'

COLUMNS = ['id', 'title', 'description', 'status', 'created_at']


def load_config():
    load_dotenv(ENV_PATH)

    config = {
        'dbname': os.getenv('DB_NAME'),
        'user': os.getenv('DB_USER'),
        'password': os.getenv('DB_PASSWORD'),
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': os.getenv('DB_PORT', '5432'),
    }

    missing = [key for key, value in config.items() if not value]
    if missing:
        print(f'Ошибка: не заданы переменные окружения: {", ".join(missing)}')
        print(f'Создайте файл {ENV_PATH} на основе server/.env.example')
        sys.exit(1)

    return config


def export_tasks():
    config = load_config()

    try:
        connection = psycopg2.connect(**config)
    except psycopg2.Error as error:
        print(f'Ошибка подключения к PostgreSQL: {error}')
        sys.exit(1)

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'SELECT id, title, description, status, created_at '
                'FROM tasks ORDER BY id'
            )
            rows = cursor.fetchall()

        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(COLUMNS)
            for row in rows:
                writer.writerow(row)

        print(f'Экспортировано задач: {len(rows)}')
        print(f'Файл сохранён: {OUTPUT_FILE}')

    except psycopg2.Error as error:
        print(f'Ошибка при выгрузке данных: {error}')
        sys.exit(1)
    finally:
        connection.close()


if __name__ == '__main__':
    export_tasks()
