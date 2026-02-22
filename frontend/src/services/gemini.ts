import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === "your_google_gemini_api_key_here") {
  console.warn(
    "VITE_GEMINI_API_KEY is not set or is using the default placeholder in .env. Gemini calls will fail.",
  );
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

const SYSTEM_PROMPT = `
You are an empathetic AI Health Assistant. Your goal is to conduct a preliminary health intake.
You must follow these rules strictly:
1. PHASE: INTAKE. Ask exactly these questions in order, one at a time:
   - Symptoms description
   - Duration of symptoms
   - Severity (1-10)
   - Age
   - Pre-existing conditions
   - Allergies
   - Recent medications
   - Recent travel/exposure
2. TONE: Be professional, supportive, and brief. 
3. CONSTRAINT: Do not provide a diagnosis. 
4. COMPLETION: Once all questions are answered, summarize the findings and tell the user you are ready to compile the report for a doctor.
`;

/**
 * Initializes a new Gemini chat session with the Health Assistant system prompt configured.
 */
export const createHealthCheckinSession = async () => {
  // We use gemini-2.5-flash as the fast conversational model
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.2, // Keep responses fairly deterministic and professional
    },
  });

  // To start the conversation natively, we can seed it or let the component trigger the first message.
  return chat;
};
