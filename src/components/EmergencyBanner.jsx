import { AlertCircle, PhoneCall } from "lucide-react";
import { t } from "../utils/translations";

export default function EmergencyBanner({ lang }) {
  return (
    <div className="border-t border-rose-100 bg-rose-50/80 px-4 py-2.5 text-xs text-rose-950">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span className="font-medium">
            {t(lang, "emergencyBannerText")}
          </span>
        </div>
        <a
          href="tel:108"
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 font-semibold text-white hover:bg-rose-700 active:scale-95 transition-all shadow-xs"
        >
          <PhoneCall className="h-3 w-3" />
          <span>Call 108 (Free)</span>
        </a>
      </div>
    </div>
  );
}
