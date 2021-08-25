from fastapi import APIRouter, UploadFile, File
from utils.uploads import pdf_process, save_upload_file


router = APIRouter()


@router.get("/api/")
async def root():
    return {"api_test": "api_test"}


@router.post("/api/upload/")
async def create_upload_file(customfile: UploadFile = File(...)):
    pdf_filepath = await save_upload_file(customfile)
    await pdf_process(pdf_filepath)
    return {
        'filename': customfile.filename,
        'content-type': customfile.content_type,
    }
