from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Autopilot API", version="0.1.0")

# Allow your Vercel frontends (any *.vercel.app)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"service": "autopilot-api", "status": "ok"}

@app.get("/health")
def health():
    return {"ok": True}
