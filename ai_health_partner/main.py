from fastapi import FastAPI
from routes.chat import router as chat_router

app = FastAPI()

# This connects your chat.py endpoints to the main web server
# The prefix="/api" means your endpoint will look like:
# POST http://127.0.0.1:8000/api/user123/followup
app.include_router(chat_router, prefix="/api", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "Good day, how have you been today?"}

adadd