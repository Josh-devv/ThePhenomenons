from nlp.session import get_state
from nlp.health_score import calculate_health_score
from nlp.daily_progress import medication_adherence


def generate_triage_report(user_id: str) -> str:
    data = get_state(user_id).get("data", {})

    summary = f"""
    PATIENT MEDICAL ASSESSMENT REPORT

    User ID: {user_id}
    Symptoms: {data.get('symptoms', 'N/A')}
    Duration: {data.get('duration', 'N/A')}
    Severity: {data.get('severity', 'N/A')}
    Age: {data.get('age', 'N/A')}
    Pre-existing Conditions: {data.get('conditions', 'N/A')}
    Allergies: {data.get('allergies', 'N/A')}
    Current Medications: {data.get('medications', 'N/A')}
    Recent Travel/Exposure: {data.get('exposure', 'N/A')}
    """
    return summary


def generate_followup_report(user_id: str, has_new_symptoms: bool) -> str:
    score = calculate_health_score(user_id)
    adherence = medication_adherence(user_id)

    follow_summary = f"""
    PATIENT MEDICAL FOLLOW-UP REPORT

    User ID: {user_id}
    7-Day Health Score: {score}%
    Medical Adherence: {adherence}
    New Symptoms Reported: {'Yes' if has_new_symptoms else 'No'}
    """

    if has_new_symptoms:
        checkup_summary = generate_triage_report(user_id)
        return follow_summary + f"\n{checkup_summary}"

    return follow_summary

asds