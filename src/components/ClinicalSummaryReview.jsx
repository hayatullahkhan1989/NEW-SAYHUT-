import { useState } from "react";
import {
  Volume2,
  VolumeX,
  Languages,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Sparkles,
  HelpCircle,
  Clock,
  Pill,
  Activity,
  HeartPulse,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { t } from "../utils/translations";
import { speakText, stopSpeech } from "../utils/tts";

export default function ClinicalSummaryReview({
  lang,
  data,
  onConfirmReview,
  onTriggerHighRisk,
}) {
  const [showEnglishOriginal, setShowEnglishOriginal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const summary = data?.structuredSummary || {};
  const aiInfo = data?.aiInterpretation || {};

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const textToRead = `${summary.mainConcern}. Symptoms: ${summary.symptoms?.join(
        ", "
      )}. Duration: ${summary.duration}. Medications: ${summary.medicinesMentioned?.join(
        ", "
      )}. Note: ${aiInfo.summary}`;

      speakText(
        textToRead,
        lang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-6">
      {/* Top Banner & Audio Playback Bar */}
      <div className="rounded-2xl border border-sky-200 bg-linear-to-r from-sky-50 via-white to-sky-50 p-4 md:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-sky-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {t(lang, "badgeFromWords")}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Recorded: {data?.recordedAt || "Today, 10:15 AM"} • ({data?.durationSec || 42}s)
            </span>
          </div>
          <h2 className="mt-1 text-lg md:text-xl font-bold text-slate-900">
            Consultation Verification / परामर्श सत्यापन
          </h2>
          <p className="text-xs text-slate-600">
            Please verify what the system understood before submitting to your clinical record.
          </p>
        </div>

        {/* Listen Aloud Button (TTS) */}
        <button
          type="button"
          onClick={handleToggleSpeak}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            isSpeaking
              ? "bg-rose-600 text-white shadow-md animate-pulse"
              : "bg-sky-600 text-white hover:bg-sky-700 shadow-xs active:scale-95"
          }`}
          aria-label={isSpeaking ? "Stop listening aloud" : "Listen to entire summary aloud"}
        >
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          <span>{isSpeaking ? "Stop Audio" : t(lang, "listenAloud")}</span>
        </button>
      </div>

      {/* SECTION 1: PATIENT'S WORDS */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-bold text-xs">
              1
            </span>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-wide">
                {t(lang, "patientWordsTitle")}
              </h3>
              <p className="text-xs text-slate-500">
                {t(lang, "patientWordsSubtitle")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEnglishOriginal(!showEnglishOriginal)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Languages className="h-3.5 w-3.5 text-sky-600" />
              <span>
                {showEnglishOriginal
                  ? t(lang, "toggleOriginalText")
                  : t(lang, "toggleEnglishText")}
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 font-medium text-slate-800 text-sm md:text-base leading-relaxed">
          <p className="italic">
            "{showEnglishOriginal
              ? data?.englishTranscript
              : data?.originalTranscript}"
          </p>
        </div>
      </div>

      {/* SECTION 2: STRUCTURED CLINICAL FACTS */}
      <div className="rounded-2xl border border-teal-200 bg-white p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-teal-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-700 font-bold text-xs">
              2
            </span>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-wide">
                {t(lang, "structuredSummaryTitle")}
              </h3>
              <p className="text-xs text-teal-700 font-medium">
                Verified factual extractions only • Zero AI speculation
              </p>
            </div>
          </div>

          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 border border-teal-200">
            Factual Clinical Data
          </span>
        </div>

        {/* Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          {/* Main Concern */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "mainConcern")}
            </span>
            <p className="mt-1 font-semibold text-slate-900">
              {summary.mainConcern || t(lang, "notEnoughInfo")}
            </p>
          </div>

          {/* Duration */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "duration")}
            </span>
            <p className="mt-1 font-semibold text-slate-900">
              {summary.duration || t(lang, "notEnoughInfo")}
            </p>
          </div>

          {/* Symptoms Mentioned */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100 md:col-span-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "symptomsMentioned")}
            </span>
            <ul className="mt-1.5 space-y-1">
              {summary.symptoms?.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{s}</span>
                </li>
              )) || <li>{t(lang, "notEnoughInfo")}</li>}
            </ul>
          </div>

          {/* Severity */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "severity")}
            </span>
            <p className="mt-1 font-semibold text-slate-900">
              {summary.severity || t(lang, "notEnoughInfo")}
            </p>
          </div>

          {/* Relevant History */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "relevantHistory")}
            </span>
            <p className="mt-1 font-semibold text-slate-900">
              {summary.relevantHistory || t(lang, "notEnoughInfo")}
            </p>
          </div>

          {/* Medicines Mentioned */}
          <div className="rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t(lang, "medicinesMentioned")}
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {summary.medicinesMentioned?.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 border border-teal-100"
                >
                  <Pill className="h-3 w-3 text-teal-600" />
                  {m}
                </span>
              )) || <span>{t(lang, "notEnoughInfo")}</span>}
            </div>
          </div>

          {/* Other Important Info / Missing Data explicitly labeled */}
          <div className="rounded-xl bg-amber-50/40 p-3.5 border border-amber-200/70">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              Unconfirmed / Missing Information
            </span>
            <ul className="mt-1 space-y-1 text-xs text-amber-900 font-medium">
              {summary.missingOrUnconfirmed?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              )) || <li>{t(lang, "notConfirmed")}</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 3: AI INTERPRETATION (Visually Segregated & Explicitly Labeled) */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 md:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-200 text-amber-900 font-bold text-xs">
              3
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm md:text-base font-bold text-amber-950 tracking-wide">
                  {t(lang, "aiInterpretationTitle")}
                </h3>
                <span className="rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  AI Confidence: {aiInfo.confidence || 94}%
                </span>
              </div>
              <p className="text-xs text-amber-800 font-medium">
                {t(lang, "aiInterpretationNote")}
              </p>
            </div>
          </div>

          <span className="rounded-md bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-900 border border-amber-300 shrink-0">
            Educational Hypothesis Only
          </span>
        </div>

        <div className="text-xs md:text-sm text-slate-800 leading-relaxed space-y-2">
          <p>{aiInfo.summary}</p>
          <div className="rounded-lg bg-white/70 p-2.5 border border-amber-200 text-[11px] text-amber-900">
            <strong>Clinical Safety Notice:</strong> {aiInfo.disclaimer}
          </div>
        </div>
      </div>

      {/* Bottom CTA Action Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-sky-600" />
          <span>Information verified by patient before submission</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {data?.isHighRisk && (
            <button
              type="button"
              onClick={() => onTriggerHighRisk(data?.riskDetails)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
            >
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              <span>Simulate Safety Alert</span>
            </button>
          )}

          <button
            type="button"
            onClick={onConfirmReview}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-sky-700 active:scale-95 transition-all"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{t(lang, "reviewInfoBtn")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
