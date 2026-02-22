from fastapi import APIRouter, HTTPException
from schemas import ChatRequest, TriageReport, FollowUpReport
from nlp.initial_triage import triage_chat
from nlp.follow_up import follow_up
from nlp.report import generate_triage_report, generate_followup_report

# This creates the router module
router = APIRouter()

@router.post("/{user_id}/{chat_module}")
def chat(user_id: str, chat_module: str, req: ChatRequest):
    chat_module = chat_module.lower()

    # To route the request to the correct conversation engine
    if chat_module == "triage":
        reply = triage_chat(user_id, req.user_input)
    elif chat_module == "followup":
        reply = follow_up(user_id, req.user_input)
    else:
        # To return a professional error if the website sends a bad request
        raise HTTPException(
            status_code=400,
            detail="Invalid chat module. Please use 'triage' or 'followup'."
        )

    return {"reply": reply, "confidence": req.confidence}

@router.get("/{user_id}/report/triage", response_model=TriageReport)
def get_triage_report(user_id: str):
    """
    Fetches the final structured triage report for the specific user session.
    The ASP.NET backend will call this to populate the professional dashboard.
    """
    report = generate_triage_report(user_id)
    if not report:
        raise HTTPException(status_code=404, detail="Triage report not found.")
    return report

@router.get("/{user_id}/report/followup", response_model=FollowUpReport)
def get_followup_report(user_id: str, has_new_symptoms: bool = False):
    """
    Fetches the comprehensive follow-up report for a specific user.
    Includes the 7-day health score and medication adherence data.
    """
    report = generate_followup_report(user_id, has_new_symptoms)
    if not report:
        raise HTTPException(status_code=404, detail="Follow-up report not found.")
    return report