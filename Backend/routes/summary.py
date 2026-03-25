from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.summary_pipeline import generate_summary

router = APIRouter()

class SummaryRequest(BaseModel):
    text: str
    mode: str

@router.post("/generate-summary")
def generate_summary_api(req: SummaryRequest):
    if req.mode not in ["doctor", "patient"]:
        raise HTTPException(status_code=400, detail="Invalid mode")

    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Empty text")

    return {
        "mode": req.mode,
        "summary": generate_summary(req.text, req.mode)
    }
