from schemas import users
from utils import users as users_utils
from utils.dependencies import get_current_user
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from database import get_db_session
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/")
async def health_check():
    return {"Hello": "World"}


@router.post("/auth", response_model=users.TokenBase)
async def auth(form_data: OAuth2PasswordRequestForm = Depends(),
               session: AsyncSession = Depends(get_db_session)):
    user = await users_utils.get_user_by_email(email=form_data.username,
                                               session=session)
    if not user:
        raise HTTPException(status_code=400,
                            detail="Incorrect email or password")

    if not users_utils.validate_password(
            password=form_data.password,
            hashed_password=user["hashed_password"]
    ):
        raise HTTPException(status_code=400,
                            detail="Incorrect email or password")

    token = await users_utils.create_user_token(user_id=user["id"],
                                                session=session)
    return token


@router.post("/sign-up", response_model=users.User)
async def create_user(user: users.UserCreate,
                      session: AsyncSession = Depends(get_db_session)):
    db_user = await users_utils.get_user_by_email(email=user.email,
                                                  session=session)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await users_utils.create_user(user=user, session=session)


@router.get("/users/me", response_model=users.UserBaseMeReturned)
async def read_users_me(current_user: users.User = Depends(get_current_user)):
    return current_user
