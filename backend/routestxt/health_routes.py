from flask import jsonify
from datetime import datetime
import logging
from utilstxt.text_processor import tool
from utilstxt.db_manager import col, cols

logger = logging.getLogger(__name__)

def health_check():
    """Health check endpoint"""
    status = {
        "status": "healthy",
        "language_tool": tool is not None,
        "database": col is not None,
        "user_database": cols is not None,
        "timestamp": datetime.utcnow().isoformat()
    }
    return jsonify(status), 200

def not_found(error):
    """404 error handler"""
    return jsonify({
        "error": "Endpoint not found",
        "status_code": 404,
        "timestamp": datetime.utcnow().isoformat()
    }), 404

def internal_error(error):
    """500 error handler"""
    logger.error(f"Internal server error: {error}")
    return jsonify({
        "error": "Internal server error",
        "status_code": 500,
        "timestamp": datetime.utcnow().isoformat()
    }), 500