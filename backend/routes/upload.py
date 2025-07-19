from flask import Blueprint, jsonify, request
import os
from utils.loader import load_pdfs
from utils.chunker import chunk
from utils.chromavecdb import add_to_chroma

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"pdf"}

upload_bp = Blueprint("upload", __name__)

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        # Ingest and embed
        docs = load_pdfs()
        chunks = chunk(docs)
        add_to_chroma(chunks)
        return jsonify({"message": "✅ File uploaded and ingested into Chroma!", "file": file.filename}), 200

    except Exception as e:
        return jsonify({"error": f"❌ Failed to process file: {str(e)}"}), 500
