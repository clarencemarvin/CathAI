from fastapi import APIRouter, HTTPException
from .models import ChatMessage, ChatResponse
from .service import ChatbotService

router = APIRouter()
chatbot_service = ChatbotService()

@router.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    try:
        response = await chatbot_service.process_message(message)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/booking")
async def booking_chat(message: ChatMessage):
    message.chat_type = "booking"
    return await chat(message)

@router.post("/chat/navigation")
async def navigation_chat(message: ChatMessage):
    message.chat_type = "navigation"
    return await chat(message)