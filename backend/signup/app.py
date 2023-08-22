import uvicorn
from fastapi import FastAPI

from pymongo import MongoClient

mongo_cli = MongoClient("mongodb://localhost:27017/")

app = FastAPI()

class User:
    id: str
    password: str

@app.post("/user/add")
def _add(res: User):
    data = res.dict()

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, access_log=False)
