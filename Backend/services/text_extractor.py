import pdfplumber
import pytesseract
from PIL import Image
import io

def extract_text_from_file(file):
    filename = file.filename.lower()
    content = file.file.read()
    
    if filename.endswith(".pdf"):
        return extract_from_pdf(content)
    else:
        return extract_from_image(content)
    
def extract_from_pdf(content: bytes) -> str:
    text = ""
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_from_image(content: bytes) -> str:
    image = Image.open(io.BytesIO(content))
    return pytesseract.image_to_string(image)