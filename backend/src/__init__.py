from logging.config import dictConfig

from src.api.places.models import Booking, Place
from src.api.users.models import User
from src.config import settings

dictConfig(settings.LOGGING)

__all__ = [
    "Booking",
    "Place",
    "User",
]
