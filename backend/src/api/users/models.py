import uuid
from typing import TYPE_CHECKING

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.mixins import AuditMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.api.places.models import Booking


class User(Base, AuditMixin):
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(index=True, unique=True)
    password: Mapped[str] = mapped_column()
    role: Mapped[str] = mapped_column()  # ["admin", "student", "guest"]
    bookings: Mapped[list["Booking"]] = relationship(secondary="booking", back_populates="user")
