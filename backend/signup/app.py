import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

from pymongo import MongoClient

mongo_cli = MongoClient("mongodb://backend-signup-service:27017/")
db = mongo_cli.k8s
collection = db.user

app = FastAPI()

class User(BaseModel):
    id: str
    password: str

@app.post("/user/add")
def _add(res: User):
    data = res.dict()
    collection.insert_one(data)
    return 200

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000)
