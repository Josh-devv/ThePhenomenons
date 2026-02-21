from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 1. Import the middleware
from routes.chat import router as chat_router 

app = FastAPI()

# It defines the list of allowed origins (the URLs of our frontend and C# backend)
origins = [
    "http://localhost",
    "http://localhost:3000",  # Common React/Vue frontend port
    "http://localhost:5000",  # Common ASP.NET Core port
    "http://localhost:5001",
    "https://your-future-production-domain.com"
]

# Adding middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This connects the chat.py endpoints to the main web server
app.include_router(chat_router, prefix="/api", tags=["Chatbot"])

@app.get("/")
async def root():
    return {"message": "Good day, how have you been today?"}