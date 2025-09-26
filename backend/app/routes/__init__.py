from fastapi import APIRouter

router = APIRouter()

# Import other route modules and include them
from .chatbot.chat_routes import router as chatbot_router
from .transport.transport_apis import router as transport_router

# Register other routers
router.include_router(chatbot_router, prefix="/api/chatbot", tags=["chatbot"])

router.include_router(transport_router, prefix="/api/transport", tags=["transport"])
