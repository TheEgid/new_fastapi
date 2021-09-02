from datetime import datetime
from pydantic import BaseModel


class FileModel(BaseModel):
    """ Validate request data """
    filename: str
    content_type: str


class FileDetailsModel(FileModel):
    """ Return response data """
    id: int
    created_at: datetime
    # user_name: str
