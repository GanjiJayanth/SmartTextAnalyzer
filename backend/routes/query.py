from flask import Blueprint, request, jsonify
from utils.QueryResponser import response
from utils.apikey import require_api_key

query_bp = Blueprint("query", __name__)

@query_bp.route("/query", methods=["POST"])
@require_api_key()
def query_llm():
    data = request.get_json()
    user_query = data.get("query")

    if not user_query:
        return jsonify({"error": "Query missing."}), 400

    try:
        result = response(user_query)
        return jsonify({"response": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
