from flask import request, jsonify
from datetime import datetime
import logging
from utilstxt.text_processor import gram_check, calculate_readability, calculate_correction_score
from utilstxt.tone_generator import generate_tone_suggestions
from utilstxt.db_manager import col

logger = logging.getLogger(__name__)

def posttext():
    """Process and analyze text"""
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        user = data.get('user', 'anonymous')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Grammar check and correction
        issues, corrected_text = gram_check(text)
        
        # Calculate readability metrics
        readability = calculate_readability(corrected_text)
        
        # Calculate correction score
        correction_score = calculate_correction_score(text, corrected_text, len(issues))
        
        # Generate tone variations
        tone_suggestions = {
            'formal': generate_tone_suggestions(corrected_text, 'formal'),
            'casual': generate_tone_suggestions(corrected_text, 'casual'),
            'professional': generate_tone_suggestions(corrected_text, 'professional'),
            'friendly': generate_tone_suggestions(corrected_text, 'friendly'),
            'persuasive': generate_tone_suggestions(corrected_text, 'persuasive')
        }
        
        # Prepare response
        result = {
            "original_text": text,
            "corrected_text": corrected_text,
            "errors": issues,
            "correction_score": correction_score,
            "readability": readability,
            "tone_suggestions": tone_suggestions,
            "timestamp": datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT"),
            "user": user
        }
        
        # Store in database
        if col is not None:
            insert_result = col.insert_one(result)
            # Optionally add the inserted ID as a string
            result["_id"] = str(insert_result.inserted_id)
        
        # Remove _id before returning to avoid ObjectId serialization error
        result.pop("_id", None)
        
        return jsonify({"success": True, "results": [result]}), 200
        
    except Exception as e:
        logger.error(f"Error processing text: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

def gettext():
    """Retrieve analyzed texts"""
    try:
        user = request.args.get('user', '')
        limit = int(request.args.get('limit', 10))
        skip = int(request.args.get('skip', 0))
        
        if col is None:
            return jsonify({"error": "Database not available"}), 503
        
        query = {"user": user} if user else {}
        
        # Get total count
        total = col.count_documents(query)
        
        # Get results with pagination, exclude _id to avoid serialization error
        results = list(col.find(
            query,
            {'_id': 0}
        ).sort('timestamp', -1).skip(skip).limit(limit))
        
        return jsonify({
            "success": True,
            "total_found": total,
            "results": results
        }), 200
        
    except Exception as e:
        logger.error(f"Error retrieving texts: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

def get_available_tones():
    """Get list of available tone transformations"""
    tones = ['formal', 'casual', 'professional', 'friendly', 'persuasive']
    return jsonify({"tones": tones}), 200