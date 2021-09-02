from schemas.files import FileDetailsModel, FileModel
# from schemas.users import User
from utils import files as files_utils
# from utils.dependencies import get_current_user
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db_session

router = APIRouter()


@router.post("/api/files", response_model=FileDetailsModel, status_code=201)
async def create_file(file: FileModel,
                      session: AsyncSession = Depends(get_db_session)):
    file = await files_utils.create_file(file, session)
    return file
