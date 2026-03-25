from services.groq_client import get_groq_client

def generate_clinical_summary(report: str) -> str:
    client = get_groq_client()

    prompt = f"""
You are a medical summarization assistant.

TASK:
Summarize the following medical report for a clinician.

OUTPUT FORMAT (MANDATORY):
- Use bullet points starting with "-"
- Plain text only (no markdown)
- Minimum 6 bullet points

CONTENT RULES:
- INCLUDE patient demographics (age, sex) ONLY IF they are explicitly stated in the report
- Do NOT invent patient names, IDs, dates, or clinicians
- Do NOT add recommendations, follow-up, or advice
- Do NOT add diagnoses unless explicitly stated
- Include vitals and lab values ONLY if present
- Preserve all numbers exactly as written
- Summarize findings only

Medical Report:
{report}

Clinical Summary (bullet points only):
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,
        max_tokens=250
    )

    return response.choices[0].message.content.strip()
