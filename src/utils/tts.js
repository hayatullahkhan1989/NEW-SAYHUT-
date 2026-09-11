// Browser Text-to-Speech (TTS) utility with fallback and language matching

export const speakText = (text, langCode = "en", onStart, onEnd) => {
  if (!("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported in this environment");
    onEnd?.();
    return null;
  }

  window.speechSynthesis.cancel();

  if (!text) {
    onEnd?.();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // Map language codes to BCP 47 tags
  const langMap = {
    hi: "hi-IN",
    bn: "bn-IN",
    ta: "ta-IN",
    te: "te-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    pa: "pa-IN",
    en: "en-IN",
  };

  utterance.lang = langMap[langCode] || "en-US";
  utterance.rate = 0.95; // slightly slower for elderly/clear comprehension
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn("TTS playback error:", e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopSpeech = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};
