import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_session, DB_HOST
from routers import users, uploads
from fastapi import FastAPI
from fastapi.logger import logger

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5000",
]

app.include_router(users.router)
app.include_router(uploads.router)
# app.include_router(posts.router)

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_origin_regex="http://localhost:*",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    logger.warning("Starting up!")
    get_db_session()


@app.on_event("shutdown")
async def shutdown_event():
    logger.warning("Shutting down!")


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host=DB_HOST, port=80)
