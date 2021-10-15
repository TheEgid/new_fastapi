from datetime import datetime
from models.files import files_table
from schemas import files as file_schema
from sqlalchemy.ext.asyncio import AsyncSession


async def create_file(file: file_schema.FileModel,
                      session: AsyncSession):
    query = (
        files_table.insert().values(
            user_hidden_name=file.user_hidden_name,
            filename=file.filename,
            content=file.content,
            type=file.type,
            created_at=datetime.now(),
        ).returning(
            files_table.c.id,
            files_table.c.filename,
            files_table.c.content,
            files_table.c.type,
            files_table.c.created_at,
            files_table.c.user_hidden_name,
        )
    )
    _file = await session.execute(query)
    await session.commit()
    file = _file.fetchone()
    return dict(file)
