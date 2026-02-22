import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Star,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

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
  | "select-professional"
  | "under-review"
  | "rejected"
  | "approved";

export default function PatientCheckin() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("chat");
  const [messageCount, setMessageCount] = useState(0);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [rejectedIds, setRejectedIds] = useState<number[]>([]);

  const sendMessage = (text: string) => {
    if (!text.trim() || phase !== "chat") return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    setTimeout(() => {
      if (newCount >= 3) {
        const aiMsg: Message = {
          role: "ai",
          content:
            "Thank you for sharing all that information, Sarah. I've completed your assessment. Based on our conversation, I've prepared a health report for a professional to review. Please select a healthcare professional below to send your report to:",
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        setPhase("select-professional");
        return;
      }

      const aiResponses: Record<string, string> = {
        "I feel great today!":
          "That's wonderful to hear!  Any changes in sleep quality, diet, or physical activity since yesterday?",
        "I have a mild headache":
          "I'm sorry to hear that. Can you describe the headache? Is it throbbing, dull, or sharp? When did it start?",
        "I'm feeling tired":
          "Let's look into that. How many hours did you sleep last night? Have you been staying hydrated?",
        "I have some pain":
          "I'd like to help. Can you tell me where the pain is located and rate it from 1-10?",
      };
      const aiMsg: Message = {
        role: "ai",
        content:
          aiResponses[text] ||
          "Thank you for sharing. Could you tell me more about how you're feeling? Any specific symptoms or changes you've noticed?",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const selectProfessional = (prof: Professional) => {
    setSelectedProfessional(prof);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `I'd like to send my report to ${prof.name}.` },
    ]);
    setPhase("under-review");

    // Simulate professional response (approve or reject randomly for demo)
    setTimeout(() => {
      const shouldReject = Math.random() > 0.6;
      if (shouldReject) {
        setRejectedIds((prev) => [...prev, prof.id]);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `Unfortunately, ${prof.name} is currently unavailable. Please choose another professional from the list below.`,
          },
        ]);
        setPhase("select-professional");
        setSelectedProfessional(null);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `Great news! 🎉 ${prof.name} has accepted your report and has joined the conversation. You can now discuss your health plan directly.`,
          },
        ]);
        setPhase("approved");
      }
    }, 3000);
  };

  const availableProfessionals = professionals.filter(
    (p) => !rejectedIds.includes(p.id),
  );

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
          {phase === "under-review" && selectedProfessional && (
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
              <Clock className="h-5 w-5 shrink-0 text-warning" />
              <p className="text-body font-medium text-foreground">
                Your report is under review by {selectedProfessional.name}.
                Please wait shortly...
              </p>
            </div>
          )}

          {/* Professional Selection */}
          {phase === "select-professional" && (
            <div className="mt-4 space-y-3">
              <p className="text-body font-medium text-muted-foreground">
                Select a healthcare professional:
              </p>
              <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {availableProfessionals.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => selectProfessional(prof)}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {prof.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-body font-semibold text-foreground">
                        {prof.name}
                      </p>
                      <p className="text-small text-muted-foreground">
                        {prof.specialty}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-small font-medium text-foreground">
                            {prof.rating}
                          </span>
                        </div>
                        <span className="text-small text-muted-foreground">
                          · {prof.experience}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Approved Status */}
          {phase === "approved" && selectedProfessional && (
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
              <CheckCircle className="h-5 w-5 shrink-0 text-success" />
              <p className="text-body font-medium text-foreground">
                {selectedProfessional.name} is now in the conversation.
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
