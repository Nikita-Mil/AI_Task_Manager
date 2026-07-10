-- Исправление схемы после ранних версий Sequelize
-- Удаляет лишние столбцы createdAt / updatedAt

ALTER TABLE tasks DROP COLUMN IF EXISTS "createdAt";
ALTER TABLE tasks DROP COLUMN IF EXISTS "updatedAt";
