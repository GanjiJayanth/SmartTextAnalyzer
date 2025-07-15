import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    genai.configure(api_key=os.getenv("API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-pro")
    return model

def get_response_from_gemini(context, query):
    model = get_llm()
    prompt = f"""
    You are a helpful assistant. Answer the question based on the following document context.

    --- Document Context ---
    {context}

    --- User Question ---
    {query}

    --- Answer:
    """
    response = model.generate_content(prompt)
    return response.text.strip()
