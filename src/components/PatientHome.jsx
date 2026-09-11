import { Mic, FileText, MessageSquare, Clock, ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { t, LANGUAGES } from "../utils/translations";

export default function PatientHome({
  lang,
  onSelectLang,
  onStartRecording,
  onUploadDoc,
  onOpenChat,
  onViewHistoryItem,
  recentActivity = [],
}) {
  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-6">
      {/* Welcome & Language Bar */}
      <div className="rounded-2xl border border-sky-100 bg-linear-to-r from-sky-50/90 via-white to-teal-50/50 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-800">
                <Sparkles className="h-3 w-3" />
                {currentLangObj.welcome}!
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentLangObj.label} ({currentLangObj.english})
              </span>
            </div>
            <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              {t(lang, "homePrompt")}
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-600">
              {t(lang, "subTagline")}
            </p>
          </div>

          {/* Quick Language Switcher Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {LANGUAGES.slice(0, 5).map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onSelectLang(l.code)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  lang === l.code
                    ? "bg-sky-600 text-white shadow-xs font-bold"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Three Primary Actions Hierarchy */}
      <div className="space-y-4">
        {/* 1. HERO ACTION: TALK ABOUT YOUR HEALTH (Voice First) */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-sky-400 bg-linear-to-b from-sky-500 to-sky-600 p-6 md:p-8 text-white shadow-lg transition-all hover:shadow-xl">
          <div className="absolute right-3 -bottom-6 opacity-15 pointer-events-none">
            <Mic className="h-48 w-48 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Voice-First Consultation / आवाज़ से बताएं</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {t(lang, "heroTalkTitle")}
              </h3>
              <p className="text-sm md:text-base text-sky-100 leading-relaxed">
                {t(lang, "heroTalkDesc")}
              </p>
            </div>

            <button
              type="button"
              onClick={onStartRecording}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-sky-700 shadow-md hover:bg-sky-50 active:scale-95 transition-all text-base shrink-0"
              aria-label="Start Voice Consultation"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 group-hover:scale-110 transition-transform">
                <Mic className="h-6 w-6 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Tap to speak
                </div>
                <div className="text-slate-900 font-bold">
                  {t(lang, "heroTalkAction")}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-sky-600 group-hover:translate-x-1 transition-transform ml-1" />
            </button>
          </div>
        </div>

        {/* 2 & 3: Secondary Actions Grid (Upload Document + Follow-up Chat) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 2: Upload Document */}
          <div
            onClick={onUploadDoc}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  OCR & Plain Language
                </span>
              </div>
              <h4 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {t(lang, "heroUploadTitle")}
              </h4>
              <p className="mt-1.5 text-xs md:text-sm text-slate-600 leading-normal">
                {t(lang, "heroUploadDesc")}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-teal-700">
              <span>{t(lang, "heroUploadAction")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Follow-Up Chat */}
          <div
            onClick={onOpenChat}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                  Grounded In Records
                </span>
              </div>
              <h4 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {t(lang, "heroChatTitle")}
              </h4>
              <p className="mt-1.5 text-xs md:text-sm text-slate-600 leading-normal">
                {t(lang, "heroChatDesc")}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-amber-700">
              <span>{t(lang, "heroChatAction")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              {t(lang, "recentActivityTitle")}
            </h4>
          </div>
          <span className="text-xs text-slate-500">
            {recentActivity.length} records
          </span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            {t(lang, "recentEmpty")}
          </div>
        ) : (
          <div className="mt-3 divide-y divide-slate-100">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewHistoryItem(item)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 hover:bg-slate-50/80 px-2 rounded-lg cursor-pointer transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        item.urgency === "high"
                          ? "bg-rose-500"
                          : item.status === "verified"
                          ? "bg-teal-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <h5 className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.preview}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      item.status === "awaiting_review"
                        ? "bg-amber-100 text-amber-800"
                        : item.status === "verified"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.date}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}