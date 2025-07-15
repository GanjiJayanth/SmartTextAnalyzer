from flask import request, jsonify
from datetime import datetime
import logging
import bcrypt
from utilstxt.db_manager import cols

logger = logging.getLogger(__name__)

def get_users():
    """Get all users"""
    try:
        if not cols:
            return jsonify({"error": "Database not available"}), 503
        
        users = list(cols.find({}, {'_id': 0, 'password': 0}))
        return jsonify({
            "success": True,
            "total_users": len(users),
            "users": users
        }), 200
        
    except Exception as e:
        logger.error(f"Error retrieving users: {e}")
        return jsonify({"error": "Internal server error"}), 500

def register():
    """User registration"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        email = data.get('email', '').strip()
        
        if not all([username, password, email]):
            return jsonify({"error": "Missing required fields"}), 400
        
        if not cols:
            return jsonify({"error": "Database not available"}), 503
        
        # Check if username exists
        if cols.find_one({"username": username}):
            return jsonify({"error": "Username already exists"}), 409
        
        # Hash password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        # Create user document
        user = {
            "username": username,
            "password": hashed,
            "email": email,
            "created_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
            "last_login": None
        }
        
        # Insert user
        cols.insert_one(user)
        
        # Remove password from response
        user.pop('password', None)
        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "user": user
        }), 201
        
    except Exception as e:
        logger.error(f"Error registering user: {e}")
        return jsonify({"error": "Internal server error"}), 500

def login():
    """User login"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        
        if not all([username, password]):
            return jsonify({"error": "Missing credentials"}), 400
        
        if not cols:
            return jsonify({"error": "Database not available"}), 503
        
        # Find user
        user = cols.find_one({"username": username})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return jsonify({"error": "Invalid password"}), 401
        
        # Update last login
        cols.update_one(
            {"username": username},
            {"$set": {"last_login": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")}}
        )
        
        # Remove password from response
        user.pop('password', None)
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user
        }), 200
        
    except Exception as e:
        logger.error(f"Error during login: {e}")
        return jsonify({"error": "Internal server error"}), 500