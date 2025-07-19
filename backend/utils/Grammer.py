import language_tool_python
import textstat
import re
from datetime import datetime
import logging
import os
from typing import Dict, List, Tuple
from GenerativeAI import chat
from Summarizer import summary

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Initialize language tool
try:
    tool = language_tool_python.LanguageTool('en-US')
except Exception as e:
    logger.error(f"Failed to initialize LanguageTool: {e}")
    tool = None


def gram_check(text: str) -> Tuple[List[Dict], str]:
    """Improved grammar checking with better multiple error handling"""
    if not tool or not text.strip():
        return [], text

    try:
        matches = tool.check(text)
        
        if not matches:
            return [], text

        issues = []
        corrected_text = text
        
        # Sort matches by position (reverse order for proper offset handling)
        sorted_matches = sorted(matches, key=lambda x: x.offset, reverse=True)
        
        # Extract issues first (based on original text positions)
        for match in sorted(matches, key=lambda x: x.offset):
            # Get the actual error text
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

        # Apply corrections in reverse order to maintain offset accuracy
        for match in sorted_matches:
            if match.replacements:
                replacement = match.replacements[0]
                start = match.offset
                end = match.offset + match.errorLength
                
                # Ensure we don't go out of bounds
                if start >= 0 and end <= len(corrected_text):
                    before = corrected_text[:start]
                    after = corrected_text[end:]
                    corrected_text = before + replacement + after
                    
                    logger.info(f"Applied correction at {start}-{end}: '{text[start:end]}' -> '{replacement}'")

        # Post-process the corrected text
        corrected_text = post_process_corrections(corrected_text)
        
        return issues, corrected_text

    except Exception as e:
        logger.error(f"Error in grammar check: {e}")
        return [], text


def get_error_context(text: str, offset: int, length: int, context_size: int = 20) -> str:
    """Get context around the error for better understanding"""
    start = max(0, offset - context_size)
    end = min(len(text), offset + length + context_size)
    context = text[start:end]
    
    # Mark the error position in context
    error_start = offset - start
    error_end = error_start + length
    
    return {
        "full_context": context,
        "error_start": error_start,
        "error_end": error_end
    }

def post_process_corrections(text: str) -> str:
    """Enhanced post-processing for common correction issues"""
    # Fix spacing issues around punctuation
    text = re.sub(r'([.!?])([A-Z])', r'\1 \2', text)
    
    # Fix common incomplete phrases
    text = re.sub(r'if any of hurt', 'if any of this hurt you', text)
    text = re.sub(r'if any of this hurt(?!\s+you)', 'if any of this hurt you', text)
    
    # Fix double spaces
    text = re.sub(r'\s+', ' ', text)
    
    # Fix spacing around quotes
    text = re.sub(r'"\s+([.!?])', r'"\1', text)
    text = re.sub(r'([.!?])\s+"', r'\1"', text)
    
    # Fix common contractions
    text = re.sub(r'\bi\s+am\b', 'I am', text)
    text = re.sub(r'\bi\s+', 'I ', text)
    
    return text.strip()

def get_error_type(category: str) -> str:
    """Enhanced error type categorization"""
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
    """Calculate readability metrics with error handling"""
    if not text.strip():
        return {"error": "Empty text"}
    
    try:
        flesch_score = textstat.flesch_reading_ease(text)
        
        # Convert to percentage (0-100% scale)
        readability_percentage = max(0, min(100, flesch_score))
        
        # Determine readability level
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
    """Calculate correction improvement score"""
    if original == corrected:
        return 100.0
    
    word_count = len(original.split())
    if word_count == 0:
        return 0.0
    
    # Improved correction score calculation
    if errors_count == 0:
        return 100.0
    
    # Calculate score based on error density
    error_density = errors_count / word_count
    correction_percentage = max(0, 100 - (error_density * 100))
    
    return round(correction_percentage, 2)

def generate_tone_suggestions(text: str, tone: str) -> str:
    """Generate text suggestions based on tone"""
    tone_transformations = {
        'formal': {
            'replacements': {
                r'\bcan\'t\b': 'cannot',
                r'\bdon\'t\b': 'do not',
                r'\bwon\'t\b': 'will not',
                r'\bisn\'t\b': 'is not',
                r'\bI think\b': 'I believe',
                r'\bkinda\b': 'somewhat',
                r'\bgonna\b': 'going to',
                r'\bwanna\b': 'want to',
                r'\bhey\b': 'hello',
                r'\byeah\b': 'yes'
            },
            'prefix': 'I would like to respectfully present the following: ',
            'suffix': ' I hope this information proves valuable.'
        },
        'casual': {
            'replacements': {
                r'\bcannot\b': 'can\'t',
                r'\bdo not\b': 'don\'t',
                r'\bwill not\b': 'won\'t',
                r'\bis not\b': 'isn\'t',
                r'\bI believe\b': 'I think',
                r'\bsomewhat\b': 'kinda',
                r'\bhello\b': 'hey',
                r'\byes\b': 'yeah'
            },
            'prefix': 'Hey there! ',
            'suffix': ' Hope this helps!'
        },
        'professional': {
            'replacements': {
                r'\bcan\'t\b': 'cannot',
                r'\bdon\'t\b': 'do not',
                r'\bI think\b': 'In my professional opinion',
                r'\bmaybe\b': 'perhaps',
                r'\bstuff\b': 'materials',
                r'\bfigure out\b': 'determine',
                r'\bfind out\b': 'ascertain'
            },
            'prefix': 'Based on my analysis, ',
            'suffix': ' Please let me know if you require further clarification.'
        },
        'friendly': {
            'replacements': {
                r'\bHello\b': 'Hi there',
                r'\bThank you\b': 'Thanks so much',
                r'\bregards\b': 'best wishes',
                r'\bsincerely\b': 'warmly'
            },
            'prefix': 'I\'m happy to share that ',
            'suffix': ' Looking forward to hearing from you!'
        },
        'persuasive': {
            'replacements': {
                r'\bI think\b': 'I\'m confident that',
                r'\bmaybe\b': 'certainly',
                r'\bprobably\b': 'definitely',
                r'\bcould\b': 'will',
                r'\bmight\b': 'will undoubtedly'
            },
            'prefix': 'You\'ll find that ',
            'suffix': ' This opportunity shouldn\'t be missed!'
        }
    }
    
    if tone not in tone_transformations:
        return text
    
    transformed = text
    tone_config = tone_transformations[tone]
    
    # Apply replacements
    for pattern, replacement in tone_config['replacements'].items():
        transformed = re.sub(pattern, replacement, transformed, flags=re.IGNORECASE)
    
    # Add prefix/suffix if text is short enough
    if len(transformed.split()) < 50:
        transformed = tone_config.get('prefix', '') + transformed + tone_config.get('suffix', '')
    
    return transformed
