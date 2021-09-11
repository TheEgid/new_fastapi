from fastapi import APIRouter, UploadFile, File
from utils.uploads import pdf_process, save_upload_file, get_file_content


router = APIRouter()


@router.get("/api/")
async def root():
    return {"api_test": "api_test"}


@router.post("/api/upload/")
async def create_upload_file(customfile: UploadFile = File(...)):
    pdf_filepath = await save_upload_file(customfile)
    docx_path = await pdf_process(pdf_filepath)
    file_content = await get_file_content(docx_path)
    return {
        'filename': customfile.filename,
        'content': file_content,
        'type': customfile.content_type,
    }
