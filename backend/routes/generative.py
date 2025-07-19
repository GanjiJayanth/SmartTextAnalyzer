from flask import Blueprint, request, jsonify
from utils.QueryResponser import response
from utils.GenerativeAI import chat
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

generative_bp = Blueprint("generative", __name__)

@generative_bp.route("/generative", methods=["POST"])
def generative():
    try:
        data = request.get_json()
        
        if not data or 'user' not in data or 'text' not in data:
            return jsonify({"error": "User and text are required"}), 400
        
        text = data['text'].strip()
        tone = data['tone'].strip()
        user = data['user'].strip()
        
        if not text:
            return jsonify({"error": "Text cannot be empty"}), 400
        
        if len(text) > 10000:  # Limit text length
            return jsonify({"error": "Text too long (max 10000 characters)"}), 400
        
        logger.info(f"Processing text for user: {user}, length: {len(text)}")
        
        output = chat(text,tone)

        response={
            "output":output
        }
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in posttext: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
