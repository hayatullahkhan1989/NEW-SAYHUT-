import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { t } from "../utils/translations";

const STEPS = [
  { key: "step1", labelKey: "step1" },
  { key: "step2", labelKey: "step2" },
  { key: "step3", labelKey: "step3" },
  { key: "step4", labelKey: "step4" },
  { key: "step5", labelKey: "step5" },
];

export default function ProcessingModal({ lang, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 600);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-2xl ring-1 ring-slate-200 space-y-6 text-center animate-in zoom-in-95 duration-150">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t(lang, "processingTitle")}
          </h3>
          <p className="text-xs text-slate-500">
            Please wait a moment while we process your voice note
          </p>
        </div>

        {/* Stepped Progress Checklist */}
        <div className="space-y-3 text-left bg-slate-50 rounded-2xl p-4 border border-slate-100">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.key}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isCompleted
                    ? "text-emerald-700"
                    : isCurrent
                    ? "text-sky-800 font-semibold scale-[1.01]"
                    : "text-slate-400 opacity-60"
                }`}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin text-sky-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <span className="text-xs md:text-sm">
                  {t(lang, step.labelKey)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
          <span>Encrypted healthcare transmission</span>
        </div>
      </div>
    </div>
  );
}
