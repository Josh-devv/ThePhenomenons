import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Star,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { api } from "@/api/api";
import { createHealthCheckinSession } from "@/services/gemini";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface Professional {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  avatar: string;
}

const professionals: Professional[] = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Internal Medicine",
    rating: 4.9,
    experience: "12 years",
    avatar: "EC",
  },
  {
    id: 2,
    name: "Dr. James Lee",
    specialty: "Cardiology",
    rating: 4.8,
    experience: "15 years",
    avatar: "JL",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "General Practice",
    rating: 4.7,
    experience: "8 years",
    avatar: "PS",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialty: "Pulmonology",
    rating: 4.6,
    experience: "10 years",
    avatar: "MB",
  },
  {
    id: 5,
    name: "Dr. Sarah Wilson",
    specialty: "Preventive Medicine",
    rating: 4.9,
    experience: "14 years",
    avatar: "SW",
  },
];

const initialMessages: Message[] = [
  {
    role: "ai",
    content:
      "Good morning, Sarah!  How are you feeling today? Let's start your daily health check-in.",
  },
];

const quickReplies = [
  "I feel great today!",
  "I have a mild headache",
  "I'm feeling tired",
  "I have some pain",
];

type ChatPhase =
  | "chat"
  | "review-report"
  | "select-professional"
  | "under-review"
  | "rejected"
  | "approved";

export default function PatientCheckin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true); // Start true while AI initializes
  const [phase, setPhase] = useState<ChatPhase>("chat");
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);

  const { user } = useAuth();

  const chatRef = useRef<any>(null);

  // Initialize the Gemini Session on mount
  useEffect(() => {
    let isMounted = true;
    createHealthCheckinSession().then(async (session) => {
      chatRef.current = session;
      try {
        // Kick off the conversation
        const response = await session.sendMessage({
          message: "Hello. I would like to check in.",
        });
        if (isMounted) {
          setMessages([{ role: "ai", content: response.text }]);
          setIsTyping(false);
        }
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        if (isMounted) {
          setMessages([
            {
              role: "ai",
              content:
                "Sorry, I am having trouble connecting to my service right now.",
            },
          ]);
          setIsTyping(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || phase !== "chat" || !chatRef.current) return;

    // 1. Add User Message
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Await Gemini Response
    try {
      const response = await chatRef.current.sendMessage({ message: text });
      const aiText = response.text || "";

      const aiMsg: Message = { role: "ai", content: aiText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // 3. Check for Completion Condition in Output
      const lowerText = aiText.toLowerCase();
      if (
        lowerText.includes("ready to compile") ||
        lowerText.includes("summarize the findings") ||
        lowerText.includes("report for a doctor")
      ) {
        // The AI has indicated it's finished the intake
        setTimeout(() => setPhase("review-report"), 2000);
      }
    } catch (err) {
      console.error("AI Communication Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I'm having trouble understanding you right now. Please try again.",
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleSendToDoctor = async () => {
    // 1. Compile the payload
    const payload = {
      id: "live-session",
      patient: user?.name || "Sarah Johnson",
      type: "AI Triage Report",
      generated: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      risk: "high", // Provide a mock risk tag for the UI
      chatHistory: messages,
    };

    // 2. Save directly to localStorage for the Professional side to read
    localStorage.setItem("wellsync_live_report", JSON.stringify(payload));

    // 3. Skip selection list entirely and show the confirmation
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content:
          "I have securely forwarded your intake report. A healthcare professional will review it and connect with you here shortly.",
      },
    ]);
    setPhase("under-review");
  };

  return (
    <div className="animate-fade-in flex h-[calc(100vh-4rem)] flex-col">
      <div className="mb-6">
        <h1 className="text-foreground">Health Partner</h1>
        <p className="mt-1 text-body text-muted-foreground">
          Chat with your AI health partner
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto rounded-xl bg-card p-6 shadow-card">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "ai" ? "bg-secondary" : "bg-primary"
                }`}
              >
                {msg.role === "ai" ? (
                  <Bot className="h-4 w-4 text-secondary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 text-body ${
                  msg.role === "ai"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Bot className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Under Review Status */}
          {phase === "under-review" && (
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
              <Clock className="h-5 w-5 shrink-0 text-warning" />
              <p className="text-body font-medium text-foreground">
                Your report is under review by a healthcare professional. Please
                wait shortly...
              </p>
            </div>
          )}

          {/* Review Report Button */}
          {phase === "review-report" && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSendToDoctor}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-body font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
                Send Report to Doctor
              </button>
            </div>
          )}

          {/* Approved Status (For backwards compatibility if needed) */}
          {phase === "approved" && (
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
              <CheckCircle className="h-5 w-5 shrink-0 text-success" />
              <p className="text-body font-medium text-foreground">
                A professional has joined the conversation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Replies - only in chat phase */}
      {phase === "chat" && (
        <div className="mt-4 flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => sendMessage(reply)}
              className="rounded-full border border-primary bg-transparent px-4 py-2 text-small font-medium text-primary transition-colors hover:bg-primary/5"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input - only in chat or approved phase */}
      {(phase === "chat" || phase === "approved") && (
        <div className="mt-3 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => sendMessage(input)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
