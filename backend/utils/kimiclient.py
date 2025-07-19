import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()  # Load OPENROUTER_API_KEY from .env

class OpenRouterClient:
    def __init__(self, model="moonshotai/kimi-k2:free"):
        self.api_key = os.getenv("open_router")
        self.model = model
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:4000",  # Change this to your actual domain when deployed
            "X-Title": "Smart Text Analyzer"
        }

    def chat(self, messages):
        payload = {
            "model": self.model,
            "messages": messages
        }

        try:
            response = requests.post(self.base_url, headers=self.headers, data=json.dumps(payload))
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"[OpenRouterClient Error] {e}")
            return {"error": str(e)}
