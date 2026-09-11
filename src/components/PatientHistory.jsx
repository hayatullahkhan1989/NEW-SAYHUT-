import { useState } from "react";
import { Clock, Mic, FileText, MessageSquare, ArrowRight, CheckCircle2, AlertTriangle, Filter } from "lucide-react";
import { t } from "../utils/translations";

export default function PatientHistory({
  lang,
  historyItems,
  onSelectItem,
}) {
  const [filterType, setFilterType] = useState("all");

  const filteredItems =
    filterType === "all"
      ? historyItems
      : historyItems.filter((item) => item.type === filterType);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Health Timeline / स्वास्थ्य इतिहास
          </h2>
          <p className="text-xs text-slate-500">
            Chronological record of your voice notes, prescriptions, and consultations
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {["all", "voice", "document", "chat"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all ${
                filterType === type
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {type === "all" ? "All" : type === "voice" ? "Voice" : type === "document" ? "Prescriptions" : "Chat"}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
        {filteredItems.map((item) => {
          const isVoice = item.type === "voice";
          const isDoc = item.type === "document";

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-sky-300 hover:shadow-md transition-all"
            >
              {/* Timeline Bullet */}
              <div
                className={`absolute -left-[35px] top-5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-xs ${
                  isVoice
                    ? "bg-sky-600"
                    : isDoc
                    ? "bg-teal-600"
                    : "bg-amber-600"
                }`}
              >
                {isVoice ? (
                  <Mic className="h-3.5 w-3.5" />
                ) : isDoc ? (
                  <FileText className="h-3.5 w-3.5" />
                ) : (
                  <MessageSquare className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Card Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      item.status === "awaiting_review"
                        ? "bg-amber-100 text-amber-900"
                        : item.status === "verified"
                        ? "bg-teal-100 text-teal-900"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.date}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
                {item.preview}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                <span>Recorded in: <strong className="text-slate-700">{item.languageLabel}</strong></span>
                <span className="inline-flex items-center gap-1 font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform">
                  View Full Details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
