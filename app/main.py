import uvicorn
from database import database
from routers import posts, users
from fastapi import FastAPI


app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(users.router)
# app.include_router(posts.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000)
