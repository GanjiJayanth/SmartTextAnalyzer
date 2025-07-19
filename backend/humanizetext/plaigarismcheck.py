from flask import Flask, request, jsonify,Blueprint
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

check_bp = Blueprint('check_bp', __name__)

def check_plagiarism(text1, text2):
    vectorizer = TfidfVectorizer().fit_transform([text1, text2])
    vectors = vectorizer.toarray()
    similarity = cosine_similarity([vectors[0]], [vectors[1]])[0][0]
    return round(similarity * 100, 2)  # return percentage

@check_bp.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    text1 = data.get('text1')
    text2 = data.get('text2')
    
    if not text1 or not text2:
        return jsonify({'error': 'Both texts are required.'}), 400

    score = check_plagiarism(text1, text2)
    return jsonify({'similarity_percentage': score})


