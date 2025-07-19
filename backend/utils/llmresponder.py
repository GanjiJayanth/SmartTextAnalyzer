from utils.kimiclient import OpenRouterClient

def get_response_from_gemini(context, query):
    prompt = f"""
You are a helpful assistant. Answer the question based on the following document context.

--- Document Context ---
{context}

--- User Question ---
{query}

--- Answer:
"""
    client = OpenRouterClient()
    messages = [
        {"role": "user", "content": prompt}
    ]
    response = client.chat(messages)

    try:
        return response['choices'][0]['message']['content'].strip()
    except (KeyError, IndexError):
        return "An error occurred while fetching response."
