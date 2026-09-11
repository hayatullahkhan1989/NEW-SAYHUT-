import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
  ShieldAlert,
  FileText,
  HeartPulse,
  CornerDownRight,
  User,
  Bot,
} from "lucide-react";
import { t } from "../utils/translations";
import { speakText, stopSpeech } from "../utils/tts";

export default function FollowUpChat({
  lang,
  patientContext,
  onNavigateHome,
}) {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      role: "assistant",
      timestamp: "Just now",
      factContent:
        patientContext?.issue ||
        "Based on your recent consultation, you reported chest heaviness and breathlessness for 3 days and take Amlodipine 5mg.",
      aiContent:
        "I can help explain your symptoms, guide you on what to ask your doctor, or clarify prescription directions. What would you like to know?",
      safetyNotice:
        "This assistant provides general educational information and cannot replace an in-person medical evaluation.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (userText) => {
    const text = userText || input;
    if (!text.trim()) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Generate contextually grounded answer
    setTimeout(() => {
      let fact = "From your consultation records:";
      let aiGuidance = "";

      const lower = text.toLowerCase();
      if (lower.includes("ask") || lower.includes("doctor")) {
        fact = "You mentioned chest tightness on climbing stairs and taking Amlodipine 5mg.";
        aiGuidance =
          "Key questions to ask your doctor:\n1. 'Could my chest heaviness on climbing stairs be related to my blood pressure or heart?'\n2. 'Do I need an ECG or blood test today?'\n3. 'Should I continue taking Amlodipine 5mg at the same time?'";
      } else if (lower.includes("medicine") || lower.includes("amlodipine") || lower.includes("metformin")) {
        fact = "Your active medicine is Amlodipine 5mg (once daily in morning) to control hypertension.";
        aiGuidance =
          "Amlodipine works by relaxing blood vessels so blood flows more easily. It should be taken regularly as prescribed. Never abruptly stop without speaking to your doctor.";
      } else if (lower.includes("emergency") || lower.includes("hospital") || lower.includes("seek")) {
        fact = "You reported breathlessness worse when lying down.";
        aiGuidance =
          "Seek immediate emergency medical care (Call 108) if you feel sudden crushing chest pain, cold sweating, pain radiating to your left arm or jaw, or severe breathlessness.";
      } else if (lower.includes("simple") || lower.includes("explain")) {
        fact = "Recorded issue: Chest heaviness for 3 days with dry cough.";
        aiGuidance =
          "In simple words: Your heart and lungs are working harder than usual. Because you have high blood pressure, you should have a doctor listen to your chest and check your pulse soon.";
      } else {
        fact = "Based on your verified symptom summary:";
        aiGuidance =
          "I have noted your question. While your symptoms are being reviewed, please rest comfortably and avoid physical strain like climbing stairs.";
      }

      const assistantReply = {
        id: `a-${Date.now()}`,
        role: "assistant",
        timestamp: "Now",
        factContent: fact,
        aiContent: aiGuidance,
        safetyNotice:
          "This assistant provides general educational information and is not a medical diagnosis.",
      };

      setMessages((prev) => [...prev, assistantReply]);
    }, 600);
  };

  const handleToggleVoiceInput = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
    } else {
      setIsVoiceRecording(true);
      // Simulate quick spoken query input
      setTimeout(() => {
        setIsVoiceRecording(false);
        setInput("What questions should I ask my doctor about my chest tightness?");
      }, 1500);
    }
  };

  const handleSpeakMessage = (msg) => {
    if (speakingMsgId === msg.id) {
      stopSpeech();
      setSpeakingMsgId(null);
    } else {
      const fullText = `${msg.factContent}. ${msg.aiContent}`;
      speakText(
        fullText,
        lang,
        () => setSpeakingMsgId(msg.id),
        () => setSpeakingMsgId(null)
      );
    }
  };

  const suggestedChips = [
    { label: t(lang, "chipAskDoctor"), prompt: "What should I ask my doctor?" },
    { label: t(lang, "chipMedicineDo"), prompt: "What does this medicine do?" },
    { label: t(lang, "chipWhenDoctor"), prompt: "When should I seek medical help?" },
    { label: t(lang, "chipSimplerLanguage"), prompt: "Can you explain this in simpler language?" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-4 md:py-6 flex flex-col h-[calc(100vh-130px)]">
      {/* 1. Patient Context Summary Header (Persistent Top) */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-3.5 shadow-xs mb-3">
        <div className="flex items-center justify-between border-b border-sky-200/60 pb-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950 uppercase tracking-wider">
            <HeartPulse className="h-4 w-4 text-sky-600" />
            <span>{t(lang, "chatContextTitle")}</span>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-sky-800 border border-sky-200">
            {lang.toUpperCase()} Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-1.5 text-slate-700">
            <span className="font-bold text-slate-900 shrink-0">Issue:</span>
            <span className="line-clamp-1">
              {patientContext?.issue || "Chest tightness & breathlessness (3 days)"}
            </span>
          </div>
          <div className="flex items-start gap-1.5 text-slate-700">
            <span className="font-bold text-slate-900 shrink-0">Recent Doc:</span>
            <span className="line-clamp-1">
              {patientContext?.recentDoc || "Prescription: Dr. Amit Verma"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Messages Viewport */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-3">
        {messages.map((m) => {
          if (m.role === "user") {
            return (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-md rounded-2xl rounded-tr-xs bg-sky-600 px-4 py-3 text-sm text-white shadow-xs">
                  <p>{m.text}</p>
                  <span className="mt-1 block text-right text-[10px] text-sky-200 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          // Assistant Message with Strict Classification
          return (
            <div key={m.id} className="flex gap-2.5 max-w-xl">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 mt-1">
                <Bot className="h-4 w-4" />
              </div>

              <div className="flex-1 space-y-2 rounded-2xl rounded-tl-xs border border-slate-200 bg-white p-4 shadow-xs">
                {/* A. FACTS FROM YOUR INFORMATION */}
                {m.factContent && (
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80 space-y-1">
                    <span className="inline-block rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 tracking-wider">
                      {t(lang, "tagFact")}
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {m.factContent}
                    </p>
                  </div>
                )}

                {/* B. AI-GENERATED GUIDANCE */}
                {m.aiContent && (
                  <div className="rounded-xl bg-amber-50/50 p-3 border border-amber-200/70 space-y-1">
                    <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900 tracking-wider">
                      {t(lang, "tagAi")}
                    </span>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {m.aiContent}
                    </p>
                  </div>
                )}

                {/* C. MEDICAL SAFETY NOTICE & AUDIO READOUT */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{m.safetyNotice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeakMessage(m)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-sky-700 hover:bg-sky-50 transition-colors font-bold text-xs shrink-0"
                    title="Read this explanation aloud"
                  >
                    {speakingMsgId === m.id ? (
                      <VolumeX className="h-3.5 w-3.5 text-rose-600" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                    <span>{speakingMsgId === m.id ? "Stop" : "Listen"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* 3. Suggested Follow-Up Chips */}
      <div className="py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {suggestedChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip.prompt)}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-sky-300 hover:bg-sky-50 active:scale-95 transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 4. Bottom Input Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-md flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleVoiceInput}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
            isVoiceRecording
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          title="Ask question by speaking"
          aria-label="Voice question input"
        >
          {isVoiceRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={isVoiceRecording ? "Listening to your voice..." : t(lang, "chatInputPlaceholder")}
          className="flex-1 bg-transparent px-2 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white disabled:opacity-40 hover:bg-sky-700 active:scale-95 transition-all shadow-xs"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}