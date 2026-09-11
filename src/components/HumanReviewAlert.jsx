import { ShieldAlert, PhoneCall, Clock, AlertCircle, HeartPulse, CheckCircle2, ArrowLeft } from "lucide-react";
import { t } from "../utils/translations";

export default function HumanReviewAlert({
  lang,
  riskDetails,
  onBackToHome,
}) {
  const details = riskDetails || {
    reason: "Potential acute cardiovascular / hypertensive cardiac stress",
    triggerPhrase: "Chest tightness for 3 days worsening on stairs and lying down with breathlessness",
    level: "High Priority - Staff Review",
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12 space-y-6">
      {/* Calm, Protective Card */}
      <div className="rounded-3xl border-2 border-amber-300 bg-linear-to-b from-amber-50/90 via-white to-amber-50/40 p-6 md:p-8 shadow-md text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-xs">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full bg-amber-200/80 px-3 py-1 text-xs font-bold text-amber-950 uppercase tracking-wider">
            {t(lang, "humanReviewTitle")}
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t(lang, "humanReviewSub")}
          </h2>
          <p className="mx-auto max-w-md text-xs md:text-sm text-slate-600 leading-relaxed">
            {t(lang, "humanReviewReassurance")}
          </p>
        </div>

        {/* Structured Review Breakdown */}
        <div className="text-left rounded-2xl bg-white p-5 border border-amber-200 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t(lang, "humanReviewReasonLabel")}
            </span>
            <p className="mt-0.5 text-sm font-bold text-slate-900">
              {details.reason}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t(lang, "humanReviewTriggerLabel")}
            </span>
            <div className="mt-1 rounded-lg bg-amber-50/80 p-3 text-xs font-medium text-amber-950 border border-amber-200/60">
              "{details.triggerPhrase}"
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {t(lang, "humanReviewStatusLabel")}
              </span>
              <div className="mt-0.5 flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span>{t(lang, "humanReviewStatusAwaiting")}</span>
              </div>
            </div>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </div>

        {/* Emergency Call Section */}
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>If symptoms feel severe or are worsening right now:</span>
          </div>

          <a
            href="tel:108"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all"
          >
            <PhoneCall className="h-4 w-4" />
            <span>{t(lang, "humanReviewEmergencyCall")}</span>
          </a>
        </div>

        {/* Back / Wait button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home Dashboard (We will notify you)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
