from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_input: str
    confidence: float = 1.0

class ChatResponse(BaseModel):
    reply: str
    confidence: float = 1.0

    addad