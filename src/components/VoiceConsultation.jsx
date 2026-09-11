import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, RotateCcw, ArrowRight, Volume2, Sparkles, AlertCircle, Clock, Shield } from "lucide-react";
import { t } from "../utils/translations";

export default function VoiceConsultation({
  lang,
  onProceedToProcessing,
  onCancel,
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulatedLevel, setSimulatedLevel] = useState([20, 45, 60, 30, 75, 40, 60, 80, 50, 35]);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const waveIntervalRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Live waveform animation while recording
  useEffect(() => {
    if (recording) {
      waveIntervalRef.current = setInterval(() => {
        setSimulatedLevel(
          Array.from({ length: 14 }, () => Math.floor(Math.random() * 65) + 20)
        );
      }, 120);
    } else {
      clearInterval(waveIntervalRef.current);
    }
    return () => clearInterval(waveIntervalRef.current);
  }, [recording]);

  // Clean up stream & timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(waveIntervalRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update preview URL on blob change
  useEffect(() => {
    if (!audioBlob) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(audioBlob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [audioBlob]);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      let stream = null;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;
        } catch (err) {
          console.warn("Microphone hardware access denied/unavailable, falling back to simulated recorder:", err);
        }
      }

      if (stream && window.MediaRecorder) {
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
          }
        };
        recorder.start(250);
      }

      setRecording(true);
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (e) {
      console.error("Recording error:", e);
      // Fallback
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => (prev >= 59 ? (stopRecording(), 60) : prev + 1));
      }, 1000);
    }
  };

  const stopRecording = () => {
    setRecording(false);
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn(e);
      }
    } else {
      // Fallback dummy blob if physical mic was unavailable
      if (!audioBlob) {
        setAudioBlob(new Blob(["simulated-audio-data"], { type: "audio/webm" }));
      }
    }
  };

  const handleTogglePlay = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReRecord = () => {
    setAudioBlob(null);
    setPreviewUrl("");
    setSeconds(0);
    setIsPlaying(false);
  };

  // Preset quick-test loader
  const handleLoadSampleHindi = () => {
    setSeconds(42);
    setAudioBlob(new Blob(["sample-sunita-audio"], { type: "audio/webm" }));
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-8 space-y-6">
      {/* Header Prompt */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Voice Intake / आवाज़ परामर्श</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t(lang, "voicePrompt")}
        </h2>
        <p className="mx-auto max-w-lg text-sm text-slate-600">
          {t(lang, "voiceSubprompt")}
        </p>
      </div>

      {/* Main Recording Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm text-center">
        {!audioBlob ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            {/* Live Audio Waveform (Visible during recording) */}
            {recording ? (
              <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-xs px-4">
                {simulatedLevel.map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-1.5 rounded-full bg-rose-500 transition-all duration-100 ease-out"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Clock className="h-4 w-4" />
                <span>Maximum duration: 1 minute (60s)</span>
              </div>
            )}

            {/* Central Mic Button */}
            <div className="relative">
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                className={`relative z-10 flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full text-white shadow-xl transition-all active:scale-95 ${
                  recording
                    ? "bg-rose-600 hover:bg-rose-700 animate-mic-pulse ring-8 ring-rose-100"
                    : "bg-sky-600 hover:bg-sky-700 hover:shadow-2xl ring-8 ring-sky-50"
                }`}
                aria-label={recording ? "Stop recording voice note" : "Start recording voice note"}
              >
                {recording ? (
                  <Square className="h-10 w-10 fill-current" />
                ) : (
                  <Mic className="h-12 w-12 stroke-[2.2]" />
                )}
              </button>
            </div>

            {/* Timer & Status Label */}
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold tracking-tight text-slate-900">
                {formatTime(seconds)} / 01:00
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {recording ? t(lang, "recordingLive") : t(lang, "tapToRecord")}
              </p>
              <p className="text-xs text-slate-400">
                {recording ? "Tap again when you finish speaking" : "Speak naturally in your mother tongue"}
              </p>
            </div>

            {/* Sample Preset Button for quick evaluation */}
            {!recording && (
              <div className="pt-4 border-t border-slate-100 w-full">
                <button
                  type="button"
                  onClick={handleLoadSampleHindi}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                  <span>Try With Sunita's Consultation (42s Hindi Note)</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Post-Recording State */
          <div className="flex flex-col items-center py-4 space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Volume2 className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                {t(lang, "audioPlaybackTitle")}
              </h3>
              <p className="text-xs text-slate-500">
                Recorded successfully • Duration: {formatTime(seconds || 42)}
              </p>
            </div>

            {/* Custom Audio Player */}
            <div className="w-full max-w-md rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
                aria-label={isPlaying ? "Pause recording" : "Play recording"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>{isPlaying ? "Playing..." : "Voice Note"}</span>
                  <span>{formatTime(seconds || 42)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full bg-sky-600 rounded-full transition-all duration-300 ${
                      isPlaying ? "w-3/4 animate-pulse" : "w-full"
                    }`}
                  />
                </div>
              </div>

              {previewUrl && (
                <audio
                  ref={audioPlayerRef}
                  src={previewUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              )}
            </div>

            {/* Action Buttons: Re-record vs Continue */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={handleReRecord}
                className="flex w-full sm:w-1/2 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4 text-slate-500" />
                <span>{t(lang, "reRecord")}</span>
              </button>

              <button
                type="button"
                onClick={() => onProceedToProcessing(seconds || 42)}
                className="flex w-full sm:w-1/2 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-sky-700 active:scale-95 transition-all"
              >
                <span>{t(lang, "continueProcessing")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reassurance Notice */}
      <div className="flex items-start gap-3 rounded-2xl bg-sky-50 border border-sky-100 p-4 text-xs text-sky-900">
        <Shield className="h-5 w-5 shrink-0 text-sky-600 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Privacy & Clinical Trust:</strong> Your voice recording is securely transcribed and translated. We will show you the exact words detected before any doctor or staff review.
        </p>
      </div>
    </div>
  );
}
