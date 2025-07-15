from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import language_tool_python
import textstat
import re
from datetime import datetime
import logging
import os
from typing import Dict, List, Tuple
import bcrypt

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Initialize language tool
try:
    tool = language_tool_python.LanguageTool('en-US')
except Exception as e:
    logger.error(f"Failed to initialize LanguageTool: {e}")
    tool = None

# MongoDB connections - Fixed duplicate connection issue
try:
    # Grammar tool database
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017'))
    db = client['grammar_tool']
    col = db['text_analyses']
    col.create_index("user")
    col.create_index("timestamp")
    
    # User authentication database
    clients = MongoClient('mongodb://localhost:27017/')  
    dbs = clients['flask']
    cols = dbs['flaskers']
    
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    client = None
    db = None
    col = None
    clients = None
    dbs = None
    cols = None

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

@app.route("/health", methods=["GET"])
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

@app.route("/posttext", methods=["POST"])
def posttext():
    """Enhanced text analysis endpoint with better error handling"""
    try:
        data = request.get_json()
        
        if not data or 'user' not in data or 'text' not in data:
            return jsonify({"error": "User and text are required"}), 400
        
        text = data['text'].strip()
        user = data['user'].strip()
        
        if not text:
            return jsonify({"error": "Text cannot be empty"}), 400
        
        if len(text) > 10000:  # Limit text length
            return jsonify({"error": "Text too long (max 10000 characters)"}), 400
        
        logger.info(f"Processing text for user: {user}, length: {len(text)}")
        
        # Core analysis
        issues, corrected_text = gram_check(text)
        readability = calculate_readability(text)
        correction_score = calculate_correction_score(text, corrected_text, len(issues))
        
        logger.info(f"Found {len(issues)} issues for user {user}")
        
        # Generate tone suggestions
        tone_suggestions = {}
        tones = ['formal', 'casual', 'professional', 'friendly', 'persuasive']
        for tone in tones:
            tone_suggestions[tone] = generate_tone_suggestions(corrected_text, tone)
        
        # Create document for database
        document = {
            "user": user,
            "text": text,
            "timestamp": datetime.utcnow(),
            "errors": issues,
            "corrected_text": corrected_text,
            "readability": readability,
            "correction_score": correction_score,
            "tone_suggestions": tone_suggestions,
            "error_count": len(issues),
            "has_corrections": text != corrected_text
        }
        
        # Save to database
        document_id = None
        if col is not None:
            try:
                result = col.insert_one(document)
                document_id = str(result.inserted_id)
                logger.info(f"Saved document with ID: {document_id}")
            except Exception as e:
                logger.error(f"Database insertion failed: {e}")
        
        # Prepare response
        response = {
            "success": True,
            "document_id": document_id,
            "original_text": text,
            "corrected_text": corrected_text,
            "has_corrections": text != corrected_text,
            "error_count": len(issues),
            "errors": issues,
            "readability": readability,
            "correction_score": correction_score,
            "tone_suggestions": tone_suggestions,
            "analysis_summary": {
                "total_errors": len(issues),
                "error_types": list(set([error['type'] for error in issues])),
                "improvement_score": correction_score,
                "readability_level": readability.get('level', 'Unknown')
            }
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in posttext: {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@app.route("/gettext", methods=["GET"])
def gettext():
    """Enhanced text retrieval with filtering options"""
    try:
        user = request.args.get('user')
        limit = int(request.args.get('limit', 10))
        include_errors_only = request.args.get('errors_only', 'false').lower() == 'true'
        
        if not user:
            return jsonify({"error": "User parameter is required"}), 400
        
        if col is None:
            return jsonify({"error": "Database not available"}), 503
        
        # Build query
        query = {"user": user}
        if include_errors_only:
            query["error_count"] = {"$gt": 0}
        
        # Find user's texts
        cursor = col.find(
            query, 
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit)
        
        results = list(cursor)
        
        if not results:
            return jsonify({"message": "No texts found for user", "results": []}), 404
        
        # Format response
        formatted_results = []
        for result in results:
            formatted_result = {
                "original_text": result.get("text", ""),
                "corrected_text": result.get("corrected_text", ""),
                "timestamp": result.get("timestamp", ""),
                "has_corrections": result.get("has_corrections", False),
                "error_count": result.get("error_count", 0),
                "readability": result.get("readability", {}),
                "correction_score": result.get("correction_score", 0),
                "errors": result.get("errors", []),
                "tone_suggestions": result.get("tone_suggestions", {}),
                "analysis_summary": {
                    "total_errors": result.get("error_count", 0),
                    "error_types": list(set([error.get('type', 'unknown') for error in result.get("errors", [])])),
                    "improvement_score": result.get("correction_score", 0),
                    "readability_level": result.get("readability", {}).get("level", "Unknown")
                }
            }
            formatted_results.append(formatted_result)
        
        response = {
            "success": True,
            "user": user,
            "total_found": len(results),
            "filter_applied": "errors_only" if include_errors_only else "all",
            "results": formatted_results
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in gettext: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/tones", methods=["GET"])
def get_available_tones():
    """Get list of available tones"""
    tones = {
        "formal": "Professional and respectful tone",
        "casual": "Relaxed and informal tone",
        "professional": "Business-appropriate tone",
        "friendly": "Warm and approachable tone",
        "persuasive": "Convincing and compelling tone"
    }
    return jsonify({"available_tones": tones}), 200

# User Authentication Routes
@app.route('/users', methods=['GET'])
def get_users():
    """Get all users (for admin purposes)"""
    try:
        if cols is None:
            return jsonify({"error": "Database not available"}), 503
            
        users = []
        for user in cols.find({}, {"_id": 0, "password": 0}):  # Don't return passwords
            users.append(user)
        return jsonify(users), 200
    except Exception as e:
        logger.error(f"Error getting users: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/register', methods=['POST'])
def register():
    """User registration with improved validation"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing JSON data'}), 400

        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400

        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400

        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        if cols is None:
            return jsonify({'error': 'Database not available'}), 503

        existing_user = cols.find_one({'username': username})
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400

        # Hash password properly
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Insert user with hashed password
        user_doc = {
            'username': username, 
            'password': hashed_password.decode('utf-8'),  # Store as string
            'created_at': datetime.utcnow()
        }
        
        cols.insert_one(user_doc)
        
        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        logger.error(f"Error in register: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/login', methods=['POST'])
def login():
    """User login with improved validation"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing JSON data'}), 400
            
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400

        if cols is None:
            return jsonify({'error': 'Database not available'}), 503

        user = cols.find_one({'username': username})
        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        stored_password = user.get('password')
        if not stored_password:
            return jsonify({'error': 'Invalid user data'}), 401

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
            return jsonify({'error': 'Invalid username or password'}), 401

        return jsonify({
            'message': 'Login successful',
            'user': username
        }), 200

    except Exception as e:
        logger.error(f"Error in login: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500

'''document.py starts here from now onwards'''

if __name__ == "__main__":
    port = int(os.getenv('PORT', 4000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    logger.info(f"Starting Flask application on port {port}")
    logger.info(f"Language Tool available: {tool is not None}")
    logger.info(f"Database available: {col is not None}")
    logger.info(f"User database available: {cols is not None}")
    
    app.run(debug=debug, port=port)
