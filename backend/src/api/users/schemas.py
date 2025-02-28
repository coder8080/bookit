from datetime import datetime

from pydantic import UUID4, BaseModel

from src.api.users.fields import Password, Username


class UserUsernameRequest(BaseModel):
    """Represents the user username request details."""

    username: Username


class UserPasswordRequest(BaseModel):
    """Represents the user password request details."""

    password: Password


class UserRegistrationRequest(BaseModel):
    """Represents the user registration details."""

    username: Username
    password: Password


class UserResponse(BaseModel):
    """Represents the public response data for a user."""

    id: UUID4
    username: Username
    created_at: datetime
    updated_at: datetime
