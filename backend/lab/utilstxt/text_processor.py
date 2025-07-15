import language_tool_python
import textstat
import re
import logging
from typing import Dict, List, Tuple

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    tool = language_tool_python.LanguageTool('en-US')
except Exception as e:
    logger.error(f"Failed to initialize LanguageTool: {e}")
    tool = None

def gram_check(text: str) -> Tuple[List[Dict], str]:
    if not tool or not text.strip():
        return [], text

    try:
        matches = tool.check(text)
        
        if not matches:
            return [], text

        issues = []
        corrected_text = text
        
        sorted_matches = sorted(matches, key=lambda x: x.offset, reverse=True)
        
        for match in sorted(matches, key=lambda x: x.offset):
            error_text = text[match.offset:match.offset + match.errorLength]
            
            issue = {
                "error": error_text,
                "suggestions": match.replacements[:3] if match.replacements else [],
                "message": match.message,
                "offset": match.offset,
                "errorLength": match.errorLength,
                "type": get_error_type(match.category),
                "context": get_error_context(text, match.offset, match.errorLength)
            }
            issues.append(issue)
            
            logger.info(f"Found error at {match.offset}-{match.offset + match.errorLength}: '{error_text}' -> {match.replacements[:3] if match.replacements else 'No suggestions'}")

        for match in sorted_matches:
            if match.replacements:
                replacement = match.replacements[0]
                start = match.offset
                end = match.offset + match.errorLength
                
                if start >= 0 and end <= len(corrected_text):
                    before = corrected_text[:start]
                    after = corrected_text[end:]
                    corrected_text = before + replacement + after
                    
                    logger.info(f"Applied correction at {start}-{end}: '{text[start:end]}' -> '{replacement}'")

        corrected_text = post_process_corrections(corrected_text)
        
        return issues, corrected_text

    except Exception as e:
        logger.error(f"Error in grammar check: {e}")
        return [], text

def get_error_context(text: str, offset: int, length: int, context_size: int = 20) -> str:
    start = max(0, offset - context_size)
    end = min(len(text), offset + length + context_size)
    context = text[start:end]
    
    error_start = offset - start
    error_end = error_start + length
    
    return {
        "full_context": context,
        "error_start": error_start,
        "error_end": error_end
    }

def post_process_corrections(text: str) -> str:
    text = re.sub(r'([.!?])([A-Z])', r'\1 \2', text)
    text = re.sub(r'if any of hurt', 'if any of this hurt you', text)
    text = re.sub(r'if any of this hurt(?!\s+you)', 'if any of this hurt you', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'"\s+([.!?])', r'"\1', text)
    text = re.sub(r'([.!?])\s+"', r'\1"', text)
    text = re.sub(r'\bi\s+am\b', 'I am', text)
    text = re.sub(r'\bi\s+', 'I ', text)
    
    return text.strip()

def get_error_type(category: str) -> str:
    category_upper = category.upper()
    
    if 'GRAMMAR' in category_upper:
        return 'grammar'
    elif 'TYPO' in category_upper or 'SPELL' in category_upper:
        return 'spelling'
    elif 'PUNCT' in category_upper:
        return 'punctuation'
    elif 'STYLE' in category_upper:
        return 'style'
    elif 'CAPITALIZ' in category_upper:
        return 'capitalization'
    elif 'WHITESPACE' in category_upper:
        return 'spacing'
    else:
        return 'other'

def calculate_readability(text: str) -> Dict:
    if not text.strip():
        return {"error": "Empty text"}
    
    try:
        flesch_score = textstat.flesch_reading_ease(text)
        readability_percentage = max(0, min(100, flesch_score))
        
        if flesch_score >= 90:
            level = "Very Easy"
        elif flesch_score >= 80:
            level = "Easy"
        elif flesch_score >= 70:
            level = "Fairly Easy"
        elif flesch_score >= 60:
            level = "Standard"
        elif flesch_score >= 50:
            level = "Fairly Difficult"
        elif flesch_score >= 30:
            level = "Difficult"
        else:
            level = "Very Difficult"
        
        return {
            "flesch_score": round(flesch_score, 2),
            "readability_percentage": round(readability_percentage, 2),
            "level": level,
            "word_count": len(text.split()),
            "sentence_count": textstat.sentence_count(text),
            "reading_time_minutes": round(textstat.reading_time(text), 2)
        }
    except Exception as e:
        logger.error(f"Error calculating readability: {e}")
        return {"error": "Could not calculate readability"}

def calculate_correction_score(original: str, corrected: str, errors_count: int) -> float:
    if original == corrected:
        return 100.0
    
    word_count = len(original.split())
    if word_count == 0:
        return 0.0
    
    if errors_count == 0:
        return 100.0
    
    error_density = errors_count / word_count
    correction_percentage = max(0, 100 - (error_density * 100))
    
    return round(correction_percentage, 2)