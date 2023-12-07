from fastapi import FastAPI, Request

app = FastAPI()
api = FastAPI(root_path="/api")
app.mount("/api", api)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@api.get("/describe/video")
async def describe_vid(request: Request):
    query = request.query_params.get("q") or request.query_params.get("query") or request.query_params.get("url")
    viddesc = describe_video(query)
    return viddesc


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

# uvicorn /Users/pratheesh.pm/miniconda3/envs/autogen/bin/python.app:app --reload  