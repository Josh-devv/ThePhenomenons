from fastapi import APIRouter, HTTPException
from schemas import ChatRequest
from nlp.initial_triage import triage_chat
from nlp.follow_up import follow_up

# This creates the router module
router = APIRouter()


@router.post("/{user_id}/{chat_module}")
def chat(user_id: str, chat_module: str, req: ChatRequest):
    chat_module = chat_module.lower()

    # Route the request to the correct conversation engine
    if chat_module == "triage":
        reply = triage_chat(user_id, req.user_input)
    elif chat_module == "followup":
        reply = follow_up(user_id, req.user_input)
    else:
        # Return a professional error if the website sends a bad request
        raise HTTPException(
            status_code=400,
            detail="Invalid chat module. Please use 'triage' or 'followup'."
        )

    return {"reply": reply, "confidence": req.confidence}