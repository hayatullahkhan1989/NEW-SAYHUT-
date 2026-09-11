import { useState } from "react";
import { Globe, Type, ShieldAlert, ArrowLeft, HeartPulse, UserCheck } from "lucide-react";
import { t } from "../utils/translations";

export default function Header({
  lang,
  onOpenLanguageModal,
  textScale,
  onCycleTextScale,
  activeScreen,
  onNavigateHome,
  onToggleStaffView,
  isStaffMode,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3 shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2">
        {/* Left: Brand or Back button */}
        <div className="flex items-center gap-3">
          {activeScreen !== "home" && (
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Go back to Home"
              title="Go back to Home"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs group-hover:bg-sky-700 transition-colors">
              <span className="text-xl">🛖</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  {t(lang, "appName")}
                </h1>
                <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800">
                  Care
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-700 font-medium">
                {t(lang, "tagline")}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Controls (Language, Font Scale, Staff Mode Switch) */}
        <div className="flex items-center gap-2">
          {/* Staff Portal Toggle */}
          <button
            type="button"
            onClick={onToggleStaffView}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all border ${
              isStaffMode
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
            title="Switch between Patient and Staff View"
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {isStaffMode ? "Staff Mode Active" : "Staff View"}
            </span>
          </button>

          {/* Text Size Switcher */}
          <button
            type="button"
            onClick={onCycleTextScale}
            className="flex h-9 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            title={`Current Text Size: ${textScale.toUpperCase()}. Tap to toggle.`}
            aria-label="Toggle text size for accessibility"
          >
            <Type className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-bold">{textScale.toUpperCase()}</span>
          </button>

          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={onOpenLanguageModal}
            className="flex h-9 items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 text-xs font-semibold text-sky-800 hover:bg-sky-100 active:scale-95 transition-all shadow-xs"
            aria-label="Change language"
          >
            <Globe className="h-3.5 w-3.5 text-sky-600" />
            <span>{lang.toUpperCase()}</span>
            <span className="hidden md:inline font-normal text-sky-600">
              (भाषा)
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}