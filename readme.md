# new_fastapi

# создать миграции
alembic revision --autogenerate -m "Init"

# применить миграции
alembic upgrade head

# внутри постгрес настройка uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

# restore бекапа
psql -f D:\playground\new_fastapi\backend\my_backup.txt async-blogs postgres