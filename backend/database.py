from environs import Env
import platform
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator

from sqlalchemy.exc import SQLAlchemyError

env = Env()
env.read_env()

DB_USER = env.str("DB_USER")
DB_PASSWORD = env.str("DB_PASSWORD")

DB_HOST = env.str("DB_HOST") if \
    (platform.system() != "Windows") else "localhost"

DB_NAME = env.str("DB_NAME")

TESTING = False  # env.str("TESTING")

if TESTING:
    DB_NAME = f"{DB_NAME}-temp-for-test"

DATABASE_URL = \
    f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

SQLAlchemyBase = declarative_base()

engine = create_async_engine(
    DATABASE_URL,
    future=True,
    echo=False,
)

async_session = sessionmaker(bind=engine, class_=AsyncSession,
                             expire_on_commit=False)


async def get_db_session() -> AsyncGenerator:
    session = async_session()
    try:
        yield session
        await session.commit()
    except SQLAlchemyError as ex:
        await session.rollback()
        raise ex
    finally:
        await session.close()
