import os
from typing import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from src.app import app
from src.config import settings
from src.db.deps import get_session
from src.db.models import Base

ENGINE = create_engine(os.getenv("DATABASE_URL", str(settings.POSTGRES_TEST_URI)))


def get_test_session() -> Iterator[Session]:
    session = Session(ENGINE)

    try:
        yield session
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


@pytest.fixture(scope="class", autouse=True)
def setup_database():
    Base.metadata.drop_all(bind=ENGINE)
    Base.metadata.create_all(bind=ENGINE)


@pytest.fixture(scope="function")
def client():
    return TestClient(app)


app.dependency_overrides[get_session] = get_test_session
