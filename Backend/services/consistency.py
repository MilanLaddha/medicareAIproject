import re

def extract_numbers(text: str) -> set:
    return set(re.findall(r"\b\d+\.?\d*\b", text))


def is_consistent(source: str, generated: str) -> bool:

    source_numbers = extract_numbers(source)
    generated_numbers = extract_numbers(generated)

    return generated_numbers.issubset(source_numbers)
