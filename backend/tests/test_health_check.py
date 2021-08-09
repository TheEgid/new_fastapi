import os.path as path
import sys

from fastapi.testclient import TestClient

sys.path.append(path.abspath(path.join(__file__, "../..")))

from main import app  # noqa: E402

client = TestClient(app)


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "Hello"}
