from datetime import datetime
from pydantic import BaseModel


class FileModel(BaseModel):
    """ Validate request data """
    filename: str
    content: str
    type: str
    user_hidden_name: str

class FileDetailsModel(FileModel):
    """ Return response data """
    id: int
    created_at: datetime
