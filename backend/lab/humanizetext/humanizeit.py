from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os

genai.configure(api_key=os.environ.get("API_KEY"))

humanizer_bp = Blueprint("humanizer_bp", __name__)

@humanizer_bp.route("/humanize", methods=["POST"])
def humanize_text():
    try:
        data = request.get_json()
        text = data.get("text")

        if not text:
            return jsonify({"error": "Missing 'text' field in JSON body"}), 400

        # Gemini model call
        model = genai.GenerativeModel("gemini-2.5-pro")
        prompt = f"Rewrite the following text to make it sound natural, human-like, and conversational:\n\n{text}"
        response = model.generate_content(prompt)

        return jsonify({
            "original": text,
            "humanized": response.text.strip()
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
