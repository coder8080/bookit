import datetime
import uuid
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.db.mixins import AuditMixin
from src.db.models import Base

if TYPE_CHECKING:
    from src.api.users.models import User


class Place(Base, AuditMixin):
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type: Mapped[str] = mapped_column()  # ["seat", "room"]
    capacity: Mapped[int] = mapped_column()
    access_level: Mapped[str] = mapped_column()  # ["student", "guest"]

    bookings: Mapped[list["Booking"]] = relationship(secondary="booking", back_populates="place")


class Booking(Base, AuditMixin):
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[str] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"))
    place_id: Mapped[str] = mapped_column(ForeignKey("place.id", ondelete="SET NULL"))
    start_date: Mapped[datetime.datetime] = mapped_column()
    end_date: Mapped[datetime.datetime] = mapped_column()
    is_activated_by_user: Mapped[bool] = mapped_column(default=False)

    user: Mapped["User"] = relationship(back_populates="bookings")
    place: Mapped["Place"] = relationship(back_populates="bookings")
