from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import json
import os
from pathlib import Path

app = FastAPI(title="User-Help API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "systems.json"
STATIC_DIR = BASE_DIR / "static"

# Mount static files
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


def load_systems():
    """Load systems data from JSON file"""
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("systems", [])
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []


@app.get("/")
async def root():
    return {"message": "User-Help API is running", "version": "1.0.0"}


@app.get("/api/systems")
async def get_systems():
    """Get list of all systems with basic info"""
    systems = load_systems()
    result = []
    for system in systems:
        result.append({
            "id": system.get("id"),
            "name": system.get("name"),
            "group": system.get("group"),
            "appLink": system.get("appLink"),
            "hasDoc": system.get("docFile") is not None
        })
    return result


@app.get("/api/systems/{system_id}")
async def get_system_detail(system_id: str):
    """Get detailed info for a specific system"""
    systems = load_systems()
    
    for system in systems:
        if system.get("id") == system_id:
            video_file = system.get("videoFile")
            doc_file = system.get("docFile")
            
            result = {
                "id": system.get("id"),
                "name": system.get("name"),
                "group": system.get("group"),
                "appLink": system.get("appLink"),
                "videoUrl": f"/static/videos/{video_file}" if video_file else None,
                "segments": system.get("segments", [])
            }
            
            if doc_file:
                result["docUrl"] = f"/static/docs/{doc_file}"
            
            return result
    
    raise HTTPException(status_code=404, detail="System not found")


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
