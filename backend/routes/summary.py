from flask import Blueprint, request, jsonify
from utils.QueryResponser import response
from utils.apikey import require_api_key
from utils.Summarizer import summary
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


summary_bp = Blueprint("summary", __name__)

@summary_bp.route("/summary", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Missing JSON body"}), 400
        
        user = data.get('user')
        text = data.get('text')

        if user is None or text is None:
            return jsonify({"error": "User and text are required"}), 400

        if not isinstance(user, str) or not isinstance(text, str):
            return jsonify({"error": "User and text must be strings"}), 400

        user = user.strip()
        text = text.strip()
        
        if not text:
            return jsonify({"error": "Text cannot be empty"}), 400
        
        if len(text) > 10000:
            return jsonify({"error": "Text too long (max 10000 characters)"}), 400
        
        logger.info(f"Processing text for user: {user}, length: {len(text)}")
        
        output = summary(text)

        return jsonify({"output": output}), 200
        
    except Exception as e:
        logger.error(f"Error in summarize: {e}")
        return jsonify({"error": "Internal server error", "details": str(e),"text":text}), 500
