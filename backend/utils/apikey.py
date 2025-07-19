# utils/apikey.py
import os
from flask import request, jsonify

def require_api_key():
    def decorator(f):
        def wrapper(*args, **kwargs):
            key = request.headers.get("x-api-key")
            if key != os.getenv("API_KEY"):
                return jsonify({"error": "Unauthorized"}), 401
            return f(*args, **kwargs)
        wrapper.__name__ = f.__name__  # Flask requires this
        return wrapper
    return decorator
