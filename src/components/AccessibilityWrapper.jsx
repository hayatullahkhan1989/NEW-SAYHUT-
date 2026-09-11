import { useState } from "react";

export default function AccessibilityWrapper({ children }) {
  const [textSize, setTextSize] = useState("base"); // base | lg | xl
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className={`${highContrast ? "bg-black text-white" : "bg-white text-black"} text-${textSize} min-h-screen`}>
      <div className="flex gap-2 p-2 justify-end">
        <button onClick={() => setTextSize("base")} className="px-2 border rounded">A</button>
        <button onClick={() => setTextSize("lg")} className="px-2 border rounded">A+</button>
        <button onClick={() => setTextSize("xl")} className="px-2 border rounded">A++</button>
        <button onClick={() => setHighContrast(!highContrast)} className="px-2 border rounded">
          {highContrast ? "☀️" : "🌙"}
        </button>
      </div>
      {children}
    </div>
  );
}