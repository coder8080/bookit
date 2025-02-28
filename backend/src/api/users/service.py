from uuid import UUID

from src.api.params import SearchParams
from src.api.users.models import User
from src.api.users.schemas import UserRegistrationRequest
from src.db.deps import SessionDepends
from src.security import get_password_hash


class UserService:
    def __init__(self, session: SessionDepends) -> None:
        self.session = session

    def get_user_by_username(self, username: str) -> User | None:
        return self.session.query(User).filter(User.username == username).first()

    def get_user_by_id(self, id: UUID) -> User | None:
        return self.session.get(User, id)

    def get_users(self, search_params: SearchParams) -> list[User]:
        query = self.session.query(User)

        if search_params.q:
            query = query.filter(User.username.icontains(search_params.q))

        return query.order_by(User.username).offset(search_params.offset).limit(search_params.limit).all()

    def register_user(self, args: UserRegistrationRequest) -> User:
        user = User(
            username=args.username,
            password=get_password_hash(args.password),
        )

        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)

        return user

    def update_username(self, user: User, new_username: str) -> None:
        user.username = new_username

        self.session.commit()
        self.session.refresh(user)

    def update_password(self, user: User, new_password: str) -> None:
        hashed_password = get_password_hash(password=new_password)
        user.password = hashed_password

        self.session.commit()
        self.session.refresh(user)
