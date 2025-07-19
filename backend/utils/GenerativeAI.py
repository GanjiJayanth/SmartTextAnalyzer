
from openai import OpenAI
import os
def chat(text,tone):
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("open_router"),  # Replace with your actual key
    )
    completion = client.chat.completions.create(
        model="meta-llama/llama-4-maverick-17b-128e-instruct:free",
        messages=[
            {
                "role": "user",
                "content": f"""Write a {tone} and grammatically correct paragraph based on the following prompt. Return only the paragraph without any additional explanation or formatting.Prompt:{text}"""
            }
        ]
    )
    return completion.choices[0].message.content
