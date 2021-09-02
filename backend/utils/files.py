from datetime import datetime
from models.files import files_table
from schemas import files as file_schema
from sqlalchemy.ext.asyncio import AsyncSession


async def create_file(file: file_schema.FileModel, session: AsyncSession):
    query = (
        files_table.insert().values(
            filename=file.filename,
            content_type=file.content_type,
            created_at=datetime.now(),
        ).returning(
            files_table.c.id,
            files_table.c.filename,
            files_table.c.content_type,
            files_table.c.created_at,
        )
    )
    _file = await session.execute(query)
    await session.commit()
    file = _file.fetchone()
    return dict(file)
