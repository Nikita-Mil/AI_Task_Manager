# AI Task Manager

Веб-приложение для управления задачами. Стек: **React**, **Node.js (Express)**, **PostgreSQL**, **Python**.

## Структура проекта

```
AI_Task_Manager/
├── client/          # React frontend
├── server/          # Node.js backend (Express)
├── database/        # SQL-скрипт инициализации БД
├── scripts/         # Python-скрипты
└── requirements.txt # Зависимости Python
```

## Требования

- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) 14+
- [Python](https://www.python.org/) 3.10+
- Git

## 1. Настройка базы данных

1. Создайте базу данных PostgreSQL:

```sql
CREATE DATABASE ai_manager;
```

2. Выполните SQL-скрипт инициализации:

```bash
psql -U postgres -d ai_manager -f database/init.sql
```

Если таблица была создана ранней версией Sequelize с лишними столбцами, выполните миграцию:

```bash
cd server
npm run migrate
```

## 2. Настройка backend

1. Перейдите в папку `server`:

```bash
cd server
```

2. Скопируйте файл окружения и укажите свои параметры подключения:

```bash
copy .env.example .env
```

3. Установите зависимости и запустите сервер:

```bash
npm install
npm run dev
```

Сервер запустится на `http://localhost:5000`.

### REST API

| Метод  | URL           | Описание              |
|--------|---------------|-----------------------|
| POST   | `/tasks`      | Создание задачи       |
| GET    | `/tasks`      | Список задач          |
| PUT    | `/tasks/:id`  | Изменение статуса     |
| DELETE | `/tasks/:id`  | Удаление задачи       |

**Статусы:** `new`, `in_progress`, `done`

**Пример создания задачи:**

```json
{
  "title": "Изучить React",
  "description": "Пройти базовый курс"
}
```

## 3. Запуск frontend

1. В новом терминале перейдите в папку `client`:

```bash
cd client
```

2. Установите зависимости и запустите приложение:

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:3000`. Запросы к API проксируются на backend.

## 4. Экспорт задач в CSV (Python)

1. Установите зависимости Python (из корня проекта):

```bash
pip install -r requirements.txt
```

2. Запустите скрипт экспорта:

```bash
python scripts/export_tasks.py
```

Скрипт подключится к PostgreSQL, выгрузит все задачи и сохранит их в файл `tasks.csv` в корне проекта.

## Сборка frontend для production

```bash
cd client
npm run build
```

## Чек-лист (Уровень 1)

- [x] Backend на Express с CRUD-методами
- [x] Обработка ошибок
- [x] Код разбит по файлам (routes, controllers, models)
- [x] Таблица `tasks` создаётся SQL-скриптом
- [x] React-приложение с формой, таблицей, select статуса и удалением
- [x] Python-скрипт `export_tasks.py` для экспорта в CSV
- [x] README с инструкцией по запуску
