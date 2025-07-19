from flask import Flask
from flask_cors import CORS
import os
import logging

# Routes for text analysis
from routestxt.text_routes import posttext, gettext, get_available_tones
from routestxt.auth_routes import get_users, register, login
from routestxt.health_routes import health_check, not_found, internal_error

# Existing blueprints for PDF upload + vector DB query
from routes.upload import upload_bp
from routes.query import query_bp

from routes.generative import generative_bp
from routes.summary import summary_bp
from humanizetext.humanizeit import humanizer_bp
from humanizetext.plaigarismcheck import check_bp

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Register route functions
app.add_url_rule('/health', 'health_check', health_check, methods=['GET'])
app.add_url_rule('/posttext', 'posttext', posttext, methods=['POST'])
app.add_url_rule('/gettext', 'gettext', gettext, methods=['GET'])
app.add_url_rule('/tones', 'get_available_tones', get_available_tones, methods=['GET'])
app.add_url_rule('/users', 'get_users', get_users, methods=['GET'])
app.add_url_rule('/register', 'register', register, methods=['POST'])
app.add_url_rule('/login', 'login', login, methods=['POST'])

# Register blueprint routes (upload/query)
app.register_blueprint(upload_bp)
app.register_blueprint(query_bp)

app.register_blueprint(summary_bp)
app.register_blueprint(generative_bp)
app.register_blueprint(humanizer_bp)
app.register_blueprint(check_bp)

# Register error handlers
app.register_error_handler(404, not_found)
app.register_error_handler(500, internal_error)

# Clear Chroma DB on start
CHROMA_PATH = "./chroma_db"

if __name__ == "__main__":
    port = int(os.getenv('PORT', 4000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'

    if os.path.exists(CHROMA_PATH):
        import shutil
        shutil.rmtree(CHROMA_PATH)
        logger.info("🧹 Chroma DB cleared on startup.")

    logger.info(f"🚀 Starting Flask application on port {port}")
    app.run(debug=debug, port=port)
