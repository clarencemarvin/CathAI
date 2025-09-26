import os
from typing import Dict, Optional
from .models import ChatType, ChatMessage, ChatResponse
from .prompts import create_chat_prompt
from dotenv import load_dotenv
load_dotenv()

class ChatbotService:
    def __init__(self):
        self.api_key = os.getenv("API_KEY")

    async def process_message(self, chat_message: ChatMessage) -> ChatResponse:
        # Create appropriate prompt based on chat type
        prompt = create_chat_prompt(
            message=chat_message.message,
            chat_type=chat_message.chat_type,
            context=chat_message.context
        )

        # Call Gemini API (using your existing function)
        response = await self._call_gemini(prompt)
        
        # Process response based on chat type
        return self._format_response(response, chat_message.chat_type)

    async def _call_gemini(self, prompt: str) -> Dict:
        # Implementation similar to your test.py but as async
        import aiohttp
        
        url = "https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini"
        headers = {
            "apiKey": self.api_key,
            "Content-Type": "application/json"
        }
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": prompt}]
                }
            ]
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=payload) as response:
                return await response.json()

    def _format_response(self, raw_response: Dict, chat_type: ChatType) -> ChatResponse:
        try:
            text_response = raw_response['candidates'][0]['content']['parts'][0]['text']
            
            # Add type-specific processing
            if chat_type == ChatType.BOOKING:
                return ChatResponse(
                    response=text_response,
                    suggestions=["Check availability", "View prices", "Complete booking"],
                    next_steps=[{"action": "view_schedule", "label": "View Schedule"}]
                )
            elif chat_type == ChatType.NAVIGATION:
                return ChatResponse(
                    response=text_response,
                    suggestions=["Show map", "Get directions", "Find nearest exit"],
                    next_steps=[{"action": "open_map", "label": "Open Map"}]
                )
            else:
                return ChatResponse(response=text_response)
                
        except KeyError:
            return ChatResponse(response="I apologize, but I'm having trouble processing your request.")