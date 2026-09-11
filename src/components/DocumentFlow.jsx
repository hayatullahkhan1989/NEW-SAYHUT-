import { useState } from "react";
import {
  Upload,
  Camera,
  FileText,
  CheckCircle2,
  Loader2,
  Volume2,
  VolumeX,
  Languages,
  Eye,
  ArrowRight,
  ShieldCheck,
  Pill,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { t, LANGUAGES } from "../utils/translations";
import { SAMPLE_DOCUMENTS } from "../utils/sampleData";
import { speakText, stopSpeech } from "../utils/tts";

export default function DocumentFlow({
  lang,
  onSaveToHistory,
  onAskFollowUpWithDoc,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [ocrStep, setOcrStep] = useState(0); // 0: idle, 1..3: processing, 4: done
  const [activeDocData, setActiveDocData] = useState(null);
  const [translatedLang, setTranslatedLang] = useState(lang);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showOriginalModal, setShowOriginalModal] = useState(false);

  const startOcrPipeline = (docData) => {
    setActiveDocData(docData);
    setOcrStep(1);

    setTimeout(() => {
      setOcrStep(2);
      setTimeout(() => {
        setOcrStep(3);
        setTimeout(() => {
          setOcrStep(4);
        }, 600);
      }, 700);
    }, 600);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // Bind to sample 1 as extracted data model
    startOcrPipeline(SAMPLE_DOCUMENTS[0]);
  };

  const handleSelectSample = (sampleDoc) => {
    setSelectedFile({ name: `${sampleDoc.title}.pdf`, size: 1024 * 450 });
    setPreviewUrl("");
    startOcrPipeline(sampleDoc);
  };

  const handleReset = () => {
    stopSpeech();
    setSelectedFile(null);
    setPreviewUrl("");
    setOcrStep(0);
    setActiveDocData(null);
    setIsSpeaking(false);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const explanationObj =
        activeDocData?.simplifiedExplanation?.[translatedLang] ||
        activeDocData?.simplifiedExplanation?.en;
      const textToSpeak = `${explanationObj?.summary}. ${explanationObj?.medList?.join(
        " "
      )}. Lifestyle: ${explanationObj?.lifestyle}`;

      speakText(
        textToSpeak,
        translatedLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const currentExplanation =
    activeDocData?.simplifiedExplanation?.[translatedLang] ||
    activeDocData?.simplifiedExplanation?.en;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-6">
      {/* Screen Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
          <FileText className="h-3.5 w-3.5" />
          <span>Document & Prescription OCR / पर्चा अनुवाद</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t(lang, "uploadDocTitle")}
        </h2>
        <p className="mx-auto max-w-lg text-sm text-slate-600">
          {t(lang, "uploadDocSub")}
        </p>
      </div>

      {/* STATE 1: UPLOAD DROPZONE */}
      {ocrStep === 0 && (
        <div className="space-y-4">
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 md:p-10 text-center hover:border-sky-400 transition-colors">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <Upload className="h-8 w-8" />
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                {t(lang, "dragDropText")}
              </p>
              <p className="text-xs text-slate-500">
                {t(lang, "fileSupportNote")}
              </p>
            </div>

            {/* Action Buttons: Browse & Camera */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-sky-700 active:scale-95 transition-all">
                <Upload className="h-4 w-4" />
                <span>Browse Files</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <label className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all">
                <Camera className="h-4 w-4 text-sky-600" />
                <span>{t(lang, "takePhoto")}</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preset Sample Prescriptions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Demonstration Prescriptions (1-Tap Test)
              </h4>
              <span className="text-[11px] text-sky-600 font-semibold">
                No file upload required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => handleSelectSample(doc)}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-left hover:border-sky-300 hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 group-hover:scale-105 transition-transform">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-sky-700">
                      {doc.title}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {doc.doctorName} • {doc.extractedData.diagnosis}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: STEPPED OCR PROCESSING */}
      {ocrStep >= 1 && ocrStep <= 3 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center max-w-md mx-auto space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Analyzing Medical Document
            </h3>
            <p className="text-xs text-slate-500">
              Extracting handwriting, medicine dosages, and instructions
            </p>
          </div>

          {/* Stepped Checklist */}
          <div className="space-y-3 text-left bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div
              className={`flex items-center gap-3 text-xs md:text-sm ${
                ocrStep >= 1 ? "text-emerald-700 font-semibold" : "text-slate-400"
              }`}
            >
              {ocrStep > 1 ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              )}
              <span>{t(lang, "docProcessingStep1")}</span>
            </div>

            <div
              className={`flex items-center gap-3 text-xs md:text-sm ${
                ocrStep >= 2 ? "text-emerald-700 font-semibold" : "text-slate-400"
              }`}
            >
              {ocrStep > 2 ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : ocrStep === 2 ? (
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                  2
                </div>
              )}
              <span>{t(lang, "docProcessingStep2")}</span>
            </div>

            <div
              className={`flex items-center gap-3 text-xs md:text-sm ${
                ocrStep >= 3 ? "text-emerald-700 font-semibold" : "text-slate-400"
              }`}
            >
              {ocrStep === 3 ? (
                <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                  3
                </div>
              )}
              <span>{t(lang, "docProcessingStep3")}</span>
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: SPLIT-PANE RESULT (Extracted Facts vs Plain Language) */}
      {ocrStep === 4 && activeDocData && (
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-teal-100 px-2 py-0.5 text-xs font-bold text-teal-800">
                {activeDocData.fileType}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeDocData.doctorName} ({activeDocData.date})
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Translate Selector */}
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                <Languages className="h-3.5 w-3.5 text-sky-600" />
                <select
                  value={translatedLang}
                  onChange={(e) => setTranslatedLang(e.target.value)}
                  className="bg-transparent font-semibold text-slate-900 focus:outline-hidden"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                </select>
              </div>

              {/* Listen TTS Button */}
              <button
                type="button"
                onClick={handleToggleSpeak}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  isSpeaking
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-teal-600 text-white hover:bg-teal-700 shadow-xs"
                }`}
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                <span>{isSpeaking ? "Stop" : t(lang, "listenAloud")}</span>
              </button>

              {/* Reset/Upload Another */}
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Upload Another</span>
              </button>
            </div>
          </div>

          {/* 2-Column Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COLUMN 1: EXTRACTED FROM DOCUMENT (Factual OCR Detection) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {t(lang, "extractedFromDocTitle")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t(lang, "extractedFromDocSub")}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                  Exact OCR
                </span>
              </div>

              {/* Document Header Info */}
              <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-1 font-mono text-slate-800 border border-slate-100">
                <div className="font-bold text-slate-900">{activeDocData.clinic}</div>
                <div>Diagnosis: {activeDocData.extractedData.diagnosis}</div>
                <div>Vitals: {activeDocData.extractedData.vitals}</div>
              </div>

              {/* Detected Medications List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Detected Prescriptions ({activeDocData.extractedData.medications.length})
                </span>
                {activeDocData.extractedData.medications.map((med, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{med.name} ({med.strength})</span>
                      <span className="rounded bg-sky-100 text-sky-800 px-1.5 py-0.5 text-[10px]">
                        {med.timing}
                      </span>
                    </div>
                    <p className="text-slate-600">{med.instructions}</p>
                    <p className="text-[11px] text-teal-700 font-medium">
                      Action: {med.purpose}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
                <strong>Follow-Up:</strong> {activeDocData.extractedData.followUp}
              </div>
            </div>

            {/* COLUMN 2: SIMPLIFIED EXPLANATION (Plain Language Breakdown) */}
            <div className="rounded-2xl border-2 border-teal-300 bg-teal-50/40 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-teal-200/80 pb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-teal-950 uppercase tracking-wider">
                      {t(lang, "simplifiedExplanationTitle")}
                    </h3>
                  </div>
                  <p className="text-xs text-teal-800">
                    {t(lang, "simplifiedExplanationSub")}
                  </p>
                </div>
                <span className="rounded-full bg-teal-200/80 px-2 py-0.5 text-[10px] font-bold text-teal-900">
                  Easy To Follow
                </span>
              </div>

              {/* Summary Statement */}
              <div className="rounded-xl bg-white p-4 border border-teal-200 shadow-xs text-sm font-medium text-slate-800">
                {currentExplanation?.summary}
              </div>

              {/* Clear Medicine Instructions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                  How To Take Your Medicines
                </span>
                {currentExplanation?.medList?.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white p-3.5 border border-teal-100 text-xs md:text-sm text-slate-800 shadow-xs"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Lifestyle & Next Visit */}
              <div className="rounded-xl bg-white p-3.5 border border-teal-100 text-xs space-y-1.5 shadow-xs">
                <div>
                  <strong className="text-slate-900">Care Advice:</strong>{" "}
                  <span className="text-slate-700">{currentExplanation?.lifestyle}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Next Step:</strong>{" "}
                  <span className="text-slate-700">{currentExplanation?.nextVisit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <button
              type="button"
              onClick={() => onSaveToHistory(activeDocData)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
              <span>Save To My Health History</span>
            </button>

            <button
              type="button"
              onClick={() => onAskFollowUpWithDoc(activeDocData)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-sky-700 transition-colors"
            >
              <span>Ask Follow-up Questions About This Rx</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
