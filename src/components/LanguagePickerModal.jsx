import { Globe, Check, X } from "lucide-react";
import { LANGUAGES } from "../utils/translations";

export default function LanguagePickerModal({ isOpen, onClose, selectedLang, onSelectLang }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 id="language-modal-title" className="text-base font-bold text-slate-900">
                Choose Your Language / भाषा चुनें
              </h2>
              <p className="text-xs text-slate-500">
                Select your preferred Indian language for speaking and reading
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close language selector"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {LANGUAGES.map((item) => {
            const isSelected = selectedLang === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  onSelectLang(item.code);
                  onClose();
                }}
                className={`flex flex-col items-start justify-between rounded-xl p-3 text-left border transition-all ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/80 ring-2 ring-sky-200"
                    : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-base font-bold text-slate-900">
                    {item.label}
                  </span>
                  {isSelected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-white">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>{item.english}</span>
                  <span className="text-[10px] text-sky-600 font-medium">({item.welcome})</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
          You can change your language anytime from the top bar.
        </div>
      </div>
    </div>
  );
}
