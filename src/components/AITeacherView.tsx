import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { askAITeacher } from "../services/aiService";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  topic?: string;
  timestamp: string;
  isFallback?: boolean;
}

export const AITeacherView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello! I am your **AI Chemistry Teacher** for CBSE Class 11 and JEE Main/Advanced.

You can ask me anything about:
• **VSEPR Theory & Lone Pair Repulsions**
• **Orbital Hybridisation ($sp$ to $sp^3d^2$)**
• **Banana Bonds in Diborane ($B_2H_6$)**
• **Oxoacids of Phosphorus, Sulphur, and Halogens**
• **Molecular Orbital Theory & Magnetic Characters**
• **Periodic Trends, Ionisation Energy & Anomalous Behaviours**

How can I help you clear your concepts today?`,
      timestamp: "Just now",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [level, setLevel] = useState<"simple" | "jee" | "advanced">("jee");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const presetQuestions = [
    "Why is Diborane (B₂H₆) called an electron-deficient molecule?",
    "Derive the geometry and hybridisation of XeF₄ using VSEPR theory.",
    "Explain the Inert Pair Effect with Group 13 and Group 14 examples.",
    "Why is Chlorine's electron gain enthalpy more negative than Fluorine's?",
    "How do we determine the acidity order of oxoacids of Sulphur?",
    "Explain 3c-2e banana bonds vs 2c-2e bonds in Al₂Cl₆ dimer.",
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery("");
    setIsLoading(true);

    try {
      const response = await askAITeacher({
        prompt: textToSend,
        level: level,
      });

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.explanation,
        isFallback: response.isFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Sorry, I encountered an error. Please check your connection and try again.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 text-xs font-semibold">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span>AI Studio Chemistry Mentor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Inorganic Chemistry Teacher
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Ask step-by-step questions on VSEPR, hybridisation, reaction pathways, or JEE Main/Advanced traps.
          </p>
        </div>

        {/* Level Selector */}
        <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1 self-start sm:self-center">
          <button
            onClick={() => setLevel("simple")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              level === "simple"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            CBSE Level
          </button>
          <button
            onClick={() => setLevel("jee")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              level === "jee"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            JEE Main
          </button>
          <button
            onClick={() => setLevel("advanced")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              level === "advanced"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            JEE Advanced
          </button>
        </div>
      </div>

      {/* Preset Suggestions */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Suggested High-Yield JEE Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-left px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all font-medium"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 min-h-[420px] max-h-[600px] overflow-y-auto space-y-6 scrollbar-none shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isUser
                    ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-cyan-950 text-cyan-400 border border-cyan-700/60 shadow-lg"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 relative group ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                    : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 font-mono">
                  <span>{isUser ? "You" : "AI Teacher"}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {!isUser && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                    {msg.isFallback && (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Offline Fallback Mode
                      </span>
                    )}
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="ml-auto flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Analyzing inorganic chemistry concepts & generating response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI Teacher e.g. 'Why is B₂H₆ electron deficient?' or 'Explain VSEPR bond angle compression'"
          className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all shadow-inner"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isLoading}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <span>Ask</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
