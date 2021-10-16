from datetime import datetime
from typing import Text
from models.files import files_table
from schemas import files as file_schema
from sqlalchemy.ext.asyncio import AsyncSession


def hide_email(email: Text) -> Text:
    part = email.split("@")
    long_stars = "*" * 3
    if len(part) > 1:
        return "{}{}{}@{}{}{}".format(
            part[0][0],
            long_stars,
            part[0][-1],
            part[1][0],
            long_stars,
            part[1][-1],
        )


async def create_file(file: file_schema.FileModel,
                      session: AsyncSession):
    hidden_name = file.user_hidden_name
    if hidden_name != 'Anonymous':
        hidden_name = hide_email(file.user_hidden_name)
    query = (
        files_table.insert().values(
            user_hidden_name=hidden_name,
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
