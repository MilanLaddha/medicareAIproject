from fastapi import APIRouter, UploadFile, File, HTTPException
from services.text_extractor import extract_text_from_file

router = APIRouter()

@router.post("/upload-report")
async def upload_report(file: UploadFile = File(...)):
    if file.content_type not in [
        "application/pdf",
        "image/png",
        "image/jpeg"
    ]:
        raise HTTPException(status_code=400 ,detail="Unsupported file type")
    
    try:
        extracted_text = extract_text_from_file(file)
    except Exception as e:
        raise HTTPException(status_code=400, detail="No text could be extracted")
    
    return {
        "message":"Report uploaded successfully",
        "text_preview": extracted_text[:1500]
    }