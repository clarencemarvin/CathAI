from pydantic import BaseModel
from typing import Optional, List, Dict
from enum import Enum

class ChatType(str, Enum):
    BOOKING = "booking"
    NAVIGATION = "navigation"
    GENERAL = "general"

class ChatMessage(BaseModel):
    message: str
    chat_type: ChatType
    context: Optional[Dict] = None

class ChatResponse(BaseModel):
    response: str
    suggestions: Optional[List[str]] = None
    next_steps: Optional[List[Dict]] = None