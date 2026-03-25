from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.groq_client import get_groq_client

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    report_text: str|None
    mode: str
    
@router.post("/chat")
def chat(req: ChatRequest):
    if not req.report_text or not req.report_text.strip():
        return {
            "reply":"Please upload a medical report first so I can answer questions about it."
        }
        
    client = get_groq_client()
    
    system_prompt = (
        """
        You are a medical assistant helping answer questions based strictly on a medical report.
        Do not diagnose. Do not give medical advice.
        Explain findings clearly.
        """
    )
    
    if req.mode == "patient":
        system_prompt += "Use simple, patient-friendly language."
    else:
        system_prompt += "Use professional clinical language."
    
    prompt = f"""
    Medical Report:{req.report_text}
    User Question:{req.message}
    Answer:
    """
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role":"system","content": system_prompt},
            {"role": "user","content":prompt}
        ],
        temperature=0.2,
        max_tokens=300
    )
    
    return {
        "reply": response.choices[0].message.content.strip()
    }