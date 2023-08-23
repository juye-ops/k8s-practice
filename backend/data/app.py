import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

import redis

rd = redis.StrictRedis(host='backend-data-service', port=6379, db=0)

app = FastAPI()

class Data(BaseModel):
    title: str
    desc: str

@app.post("/data/add")
def _add(res: Data):
    data = res.dict()
    rd.set(data["title"], data["desc"])
    return 200

@app.get("/data/list")
def _list():
    return {key: rd.get(key) for key in rd.keys()}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000)
