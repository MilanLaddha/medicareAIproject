from services.clinical_summarizer import generate_clinical_summary
from services.patient_simplifier import simplify_for_patient

def generate_summary(report: str, mode: str) -> str:
    clinical = generate_clinical_summary(report)

    if mode == "patient":
        return simplify_for_patient(clinical)

    return clinical
