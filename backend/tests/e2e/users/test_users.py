import random
from time import sleep
from typing import Any

import pytest
from fastapi import status
from fastapi.testclient import TestClient

from tests.utils.auth import register_user
from tests.utils.operators import icontains
from tests.utils.users import (
    VALID_PASSWORD_1,
    VALID_USERNAME_1,
    are_usernames_matching,
    generate_random_valid_usernames,
)


class TestGetUser:
    def test_get_user(self, client: TestClient):
        assert register_user(client, VALID_USERNAME_1, VALID_PASSWORD_1).status_code == status.HTTP_201_CREATED
        response = client.get(f"/users/{VALID_USERNAME_1}")
        assert response.status_code == status.HTTP_200_OK
        assert response.json().get("username") == VALID_USERNAME_1

    def test_get_user_404(self, client: TestClient):
        response = client.get("/users/not_actual_user")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_get_user_422(self, client: TestClient):
        username = "Ну это точно не юзернейм как бы эм"
        assert client.get(f"/users/{username}").status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestGetUsers:
    usernames = sorted(generate_random_valid_usernames(10))

    @classmethod
    def test_get_users_404(cls, client: TestClient):
        response = client.get("/users")
        assert response.status_code == status.HTTP_404_NOT_FOUND

    @classmethod
    def test_create_users(cls, client: TestClient):
        """
        Скорее предварительная стадия для подготовки юзеров
        """
        for user in cls.usernames:
            assert register_user(client, user, VALID_PASSWORD_1).status_code == status.HTTP_201_CREATED
            sleep(0.1)

    @classmethod
    def test_get_users(cls, client: TestClient):
        response = client.get("/users")

        assert response.status_code == status.HTTP_200_OK
        assert are_usernames_matching(cls.usernames, response.json())

    @classmethod
    def test_get_users_q(cls, client: TestClient):
        random_username = random.choice(cls.usernames)
        filtered_usernames = [username for username in cls.usernames if icontains(username, random_username)]
        search_query = {"q": random_username}

        response = client.get("/users", params=search_query)
        expected_usernames = filtered_usernames
        users_json = response.json()

        assert are_usernames_matching(expected_usernames, users_json), f"{expected_usernames}, {users_json}"

    @classmethod
    @pytest.mark.parametrize(
        "params, expected_slice",
        [
            ({"limit": "5"}, slice(None, 5)),
            ({"offset": "5"}, slice(5, None)),
            ({"limit": "2", "offset": "5"}, slice(5, 7)),
        ],
    )
    def test_get_users_limit_offset(cls, client: TestClient, params: dict[str, Any], expected_slice: slice):
        response = client.get("/users", params=params)
        users_json = response.json()
        expected_usernames = cls.usernames[expected_slice]

        assert are_usernames_matching(expected_usernames, users_json), f"{expected_usernames}, {users_json}"

    @classmethod
    def test_get_users_q_limit_offset(cls, client: TestClient):
        random_username = random.choice(cls.usernames)
        filtered_usernames = [username for username in cls.usernames if icontains(username, random_username)]
        search_query = {"q": random_username, "limit": "2", "offset": "0"}

        response = client.get("/users", params=search_query)
        expected_usernames = filtered_usernames[:2]
        users_json = response.json()

        assert are_usernames_matching(expected_usernames, users_json), f"{expected_usernames}, {users_json}"
