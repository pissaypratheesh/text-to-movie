from fastapi import FastAPI, Request
from airelated.videovision import describe_video
from airelated.create_img_dalle_n_vision import create_image_by_agents
from tasks.numeric_hash import create_numeric_hash
from tasks.assets_helper import extract_video_data
from tasks.summarization import run_summarization_flow
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from youtubesearchpython import VideosSearch
import os
import re
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to a list of allowed origins, or use ["http://localhost:3000"] for a specific origin
    allow_credentials=True,
    allow_methods=["*"],  # Set this to a list of allowed HTTP methods
    allow_headers=["*"],  # Set this to a list of allowed HTTP headers
)
api = FastAPI(root_path="/api")
app.mount("/api", api)

@app.get("/")
def read_root():
    return {"Hello": "World"}
app.mount("/dalle_images", StaticFiles(directory=f"./dalle_images"), name="dalle_images")


@api.get("/describe/video")
async def describe_vid(request: Request):
    query = request.query_params.get("q") or request.query_params.get("query") or request.query_params.get("url")
    viddesc = describe_video(query)
    return viddesc

@api.post("/summarize")
async def summarize(request: Request):
    data = await request.json()
    prompt = data.get("q") or data.get("query") or data.get("data")
    print("\n\n\n\n🚀 ~ file: app.py:41 ~ prompt:", prompt)
    if prompt:
        return run_summarization_flow(prompt)
    else:
        return {"error": "Missing prompt parameter"}

#http://localhost:8081/api/create_img?prompt=elephant%20and%20rabbit%20having%20running%20race%20together%20in%20same%20direction
@api.get("/create_img")
async def create_img(request: Request):
    prompt = request.query_params.get("prompt")
    if prompt:
        return create_image_by_agents(prompt)
    else:
        return {"error": "Missing prompt parameter"}
    
#http://localhost:8081/api/get_image?hash=43989934125119128162879437038109310099668647771280565966691187460338044253308
#http://localhost:8081/api/create_img?prompt=elephant%20and%20rabbit%20having%20running%20race%20together%20in%20same%20direction
@api.get("/get_image")
async def get_image(request: Request):
    hash_value = request.query_params.get("hash")
    prompt = request.query_params.get("prompt")
    if not hash_value and prompt:
        hash_value = create_numeric_hash(prompt)
    if hash_value:
        folder_path = f"./dalle_images/{hash_value}"
        if os.path.exists(folder_path):
            image_files = [f for f in os.listdir(folder_path) if f.endswith(".png") or f.endswith(".jpg")]
            if image_files:
                image_files.sort(key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else -1, reverse=True)
                image_path = os.path.join(folder_path, image_files[0])
                return FileResponse(image_path, media_type="image/png")
            else:
                return {"error": "No images found in the folder"}
        else:
            return {"error": "Folder does not exist"}
    else:
        return {"error": "Missing hash parameter"}

@api.get("/ytvideos")
async def videos(request: Request):
    query = request.query_params.get("query")
    if query:
         videosSearch = VideosSearch(query, limit = 5)
         res = videosSearch.result()
         if res:
             return extract_video_data(res['result'])
         else:
             return {"error": "No videos found"}
    else:
        return {"error": "Missing query parameter"}
   


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8081)

# uvicorn /Users/pratheesh.pm/miniconda3/envs/autogen/bin/python.app:app --reload  
#/Users/pratheesh.pm/miniconda3/envs/autogen/bin/python -m uvicorn app:app --reload --port 8081
