from re import Pattern
from typing import Any, Optional

from pydantic import PositiveInt, PostgresDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DEBUG: bool

    APP_HOST: str
    APP_PORT: int
    APP_NAME: str
    APP_VERSION: str

    API_TOKEN_URL: str
    API_USERNAME_MIN_LENGTH: Optional[PositiveInt] = None
    API_USERNAME_MAX_LENGTH: Optional[PositiveInt] = None
    API_USERNAME_PATTERN: Optional[Pattern[str]] = None
    API_PASSWORD_MIN_LENGTH: Optional[PositiveInt] = None
    API_PASSWORD_MAX_LENGTH: Optional[PositiveInt] = None
    API_PASSWORD_PATTERN: Optional[Pattern[str]] = None
    API_SEARCH_PARAMS_MAX_LIMIT: PositiveInt
    API_RATE_LIMIT: str

    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_EXPIRE_MINUTES: PositiveInt

    REDIS_HOST: str
    REDIS_PORT: int

    YANDEX_S3_KEY: str
    YANDEX_S3_KEY_ID: str
    YANDEX_S3_ENDPOINT_URL: str
    YANDEX_S3_BUCKET: str

    POSTGRES_SCHEME: str
    POSTGRES_USERNAME: str
    POSTGRES_PASSWORD: str
    POSTGRES_PORT: int
    POSTGRES_HOST: str
    POSTGRES_PATH: str

    @computed_field
    @property
    def POSTGRES_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme=self.POSTGRES_SCHEME,
            username=self.POSTGRES_USERNAME,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_HOST,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_PATH,
        )

    POSTGRES_TEST_SCHEME: str
    POSTGRES_TEST_USERNAME: str
    POSTGRES_TEST_PASSWORD: str
    POSTGRES_TEST_PORT: int
    POSTGRES_TEST_HOST: str
    POSTGRES_TEST_PATH: str

    @computed_field
    @property
    def POSTGRES_TEST_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme=self.POSTGRES_TEST_SCHEME,
            username=self.POSTGRES_TEST_USERNAME,
            password=self.POSTGRES_TEST_PASSWORD,
            host=self.POSTGRES_TEST_HOST,
            port=self.POSTGRES_TEST_PORT,
            path=self.POSTGRES_TEST_PATH,
        )

    @computed_field
    @property
    def SWAGGER_UI_PARAMETERS(self) -> dict[str, Any]:
        return {
            "persistAuthorization": True,
        }

    @computed_field
    @property
    def LOGGING(self) -> dict[str, Any]:
        return {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "basic": {
                    "class": "uvicorn.logging.ColourizedFormatter",
                    "format": "%(levelprefix)s %(message)s",
                },
                "verbose": {
                    "format": "%(asctime)s %(pathname)s:%(lineno)d %(levelname)s %(message)s",
                    "datefmt": "%d.%m.%Y %H:%M:%S",
                },
            },
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "formatter": "basic",
                    "stream": "ext://sys.stdout",
                },
            },
            "loggers": {
                "root": {
                    "level": "INFO",
                    "handlers": ["console"],
                },
                "app": {
                    "level": "DEBUG",
                    "handlers": ["console"],
                },
                "sqlalchemy.engine": {
                    "level": "WARNING",
                    "handlers": ["console"],
                },
            },
        }


settings = Settings()  # type: ignore
