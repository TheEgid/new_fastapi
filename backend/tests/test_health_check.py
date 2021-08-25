from fastapi.testclient import TestClient
from main import app  # noqa: E402

client = TestClient(app)


def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "Hello"}


def test_api_root():
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"api_test": "api_test"}
