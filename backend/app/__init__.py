# app/__init__.py

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register route blueprints
    from app.routes.text_routes import text_bp
    app.register_blueprint(text_bp, url_prefix="/api/text")

    return app
