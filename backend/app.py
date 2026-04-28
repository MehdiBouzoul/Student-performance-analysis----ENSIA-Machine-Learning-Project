from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.predict import router as predict_router
from routes.insights import router as insights_router

app = FastAPI(title="Student Performance ML API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://student-performance-analysis-ensia.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(insights_router)