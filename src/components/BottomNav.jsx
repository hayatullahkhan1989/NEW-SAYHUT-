import { Home, Mic, FileText, MessageSquare, Clock } from "lucide-react";
import { t } from "../utils/translations";

export default function BottomNav({ lang, activeScreen, onNavigate }) {
  const navItems = [
    { id: "home", label: t(lang, "navHome"), icon: Home },
    { id: "record", label: t(lang, "navTalk"), icon: Mic, isHero: true },
    { id: "upload", label: t(lang, "navUpload"), icon: FileText },
    { id: "chat", label: t(lang, "navChat"), icon: MessageSquare },
    { id: "history", label: t(lang, "navHistory"), icon: Clock },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeScreen === item.id ||
            (item.id === "record" && ["record", "review"].includes(activeScreen));

          if (item.isHero) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center -mt-5"
                aria-label={item.label}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-all active:scale-95 ${
                    isActive
                      ? "bg-sky-700 ring-4 ring-sky-100"
                      : "bg-sky-600 hover:bg-sky-700"
                  }`}
                >
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>
                <span
                  className={`mt-1 text-[10px] font-bold ${
                    isActive ? "text-sky-700" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive
                  ? "text-sky-700 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
