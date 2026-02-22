from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    user_input: str
    confidence: float = 1.0

class ChatResponse(BaseModel):
    reply: str
    confidence: float = 1.0

# --- NEW ADDITIONS BELOW ---

class TriageReport(BaseModel):
    """Data contract for the initial triage report."""
    patient_id: str
    report_type: str
    symptoms: str
    duration: str
    severity: str
    age: str
    pre_existing_conditions: str
    allergies: str
    current_medications: str
    recent_travel_exposure: str
    approval_status: int

class FollowUpReport(BaseModel):
    """Data contract for the follow-up report."""
    patient_id: str
    report_type: str
    seven_day_health_score: float  # Assuming calculate_health_score returns a number
    medical_adherence: str         # Assuming medication_adherence returns a string description
    new_symptoms_reported: bool
    approval_status: int
    # checkup_details is Optional because it's only included if has_new_symptoms is True
    checkup_details: Optional[TriageReport] = None