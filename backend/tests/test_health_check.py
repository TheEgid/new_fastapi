import sys
import pathlib
from fastapi.testclient import TestClient


sys.path.append(str(pathlib.Path.cwd() / 'backend'))

from main import app  # noqa: E402

client = TestClient(app)


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "Hello"}
