from services.groq_client import get_groq_client

def simplify_for_patient(clinical_summary: str) -> str:
    client = get_groq_client()

    prompt = f"""
You are a language simplification assistant.

TASK:
Rewrite the text below so it is easy for a patient to understand.

STRICT RULES:
- Do NOT add any new information
- Do NOT invent patient names, IDs, dates, or numbers
- Do NOT add lab values, vitals, or test results unless present
- Do NOT add medical advice, follow-up steps, or recommendations
- Do NOT use headings, bullet points, or sections
- Do NOT use templates or report-style formatting
- Output ONLY a short paragraph (4–6 sentences max)
- Keep the meaning exactly the same
- Use simple, everyday language

Text:
{clinical_summary}

Patient-Friendly Paragraph:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=400
    )

    return response.choices[0].message.content.strip()
