-- ==========================================
-- AI Task Manager Database Schema
-- ==========================================

CREATE TABLE IF NOT EXISTS tasks (

    id SERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'new',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT status_check
    CHECK (status IN ('new', 'in_progress', 'done'))

);
