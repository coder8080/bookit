from fastapi import APIRouter, HTTPException, Request, status

from src.api.deps import SearchParamsDepends
from src.api.tags import Tag
from src.api.users import me
from src.api.users.deps import UserServiceDepends
from src.api.users.fields import Username
from src.api.users.schemas import UserResponse
from src.config import settings
from src.limiter import limiter

router = APIRouter(prefix="/users", tags=[Tag.USERS])
router.include_router(me.router)


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    response_model=list[UserResponse],
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "No users found matching the provided search parameters",
        },
    },
)
@limiter.limit(settings.API_RATE_LIMIT)
def get_users(request: Request, search_params: SearchParamsDepends, service: UserServiceDepends):
    users = service.get_users(search_params)

    if not users:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No users found matching the provided search parameters.")

    return users


@router.get(
    "/{username}",
    status_code=status.HTTP_200_OK,
    response_model=UserResponse,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "No user found with the provided username",
        },
    },
)
@limiter.limit(settings.API_RATE_LIMIT)
def get_user(request: Request, username: Username, service: UserServiceDepends):
    user = service.get_user_by_username(username)

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"No user found with the username '{username}'.")

    return user
