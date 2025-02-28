from fastapi.testclient import TestClient
from httpx import Response


def register_user(client: TestClient, username: str | None = None, password: str | None = None) -> Response:
    data = {"password": password, "username": username}
    response = client.post("/auth/register", json=data)
    return response


def login_user(client: TestClient, username: str, password: str) -> Response:
    data = {"password": password, "username": username}
    response = client.post("/auth/login", data=data)
    return response
