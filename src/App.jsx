import { useState, useEffect } from "react";
import Header from "./components/Header";
import LanguagePickerModal from "./components/LanguagePickerModal";
import EmergencyBanner from "./components/EmergencyBanner";
import BottomNav from "./components/BottomNav";
import PatientHome from "./components/PatientHome";
import VoiceConsultation from "./components/VoiceConsultation";
import ProcessingModal from "./components/ProcessingModal";
import ClinicalSummaryReview from "./components/ClinicalSummaryReview";
import DocumentFlow from "./components/DocumentFlow";
import FollowUpChat from "./components/FollowUpChat";
import HumanReviewAlert from "./components/HumanReviewAlert";
import PatientHistory from "./components/PatientHistory";
import StaffReviewPortal from "./components/StaffReviewPortal";

import {
  SAMPLE_VOICE_CONSULTATIONS,
  INITIAL_PATIENT_HISTORY,
  SAMPLE_DOCUMENTS,
} from "./utils/sampleData";

export default function App() {
  const [lang, setLang] = useState("hi"); // Default to Hindi (multilingual-first)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [textScale, setTextScale] = useState("normal"); // "normal", "lg", "xl"
  const [activeScreen, setActiveScreen] = useState("home");
  const [isProcessing, setIsProcessing] = useState(false);

  // Active consultation state
  const [consultationData, setConsultationData] = useState(
    SAMPLE_VOICE_CONSULTATIONS.hi
  );
  const [activeRiskDetails, setActiveRiskDetails] = useState(null);
  const [patientHistory, setPatientHistory] = useState(INITIAL_PATIENT_HISTORY);

  // Context for follow-up chat
  const [chatContext, setChatContext] = useState({
    issue: "Chest heaviness & breathlessness on exertion (3 days)",
    recentDoc: "Prescription: Dr. Amit Verma (Diabetes & BP)",
  });

  // Apply text scale to body
  useEffect(() => {
    document.body.classList.remove("text-scale-normal", "text-scale-lg", "text-scale-xl");
    document.body.classList.add(`text-scale-${textScale}`);
  }, [textScale]);

  // When language switches, adapt default sample if it matches
  const handleSelectLang = (newLang) => {
    setLang(newLang);
    if (SAMPLE_VOICE_CONSULTATIONS[newLang]) {
      setConsultationData(SAMPLE_VOICE_CONSULTATIONS[newLang]);
    }
  };

  const handleCycleTextScale = () => {
    setTextScale((prev) => (prev === "normal" ? "lg" : prev === "lg" ? "xl" : "normal"));
  };

  const handleStartRecording = () => {
    setActiveScreen("record");
  };

  const handleProceedToProcessing = (durationSec) => {
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setActiveScreen("review");
  };

  const handleConfirmReview = () => {
    // If high risk detected, guide to human review safety screen
    if (consultationData?.isHighRisk) {
      setActiveRiskDetails(consultationData.riskDetails);
      setActiveScreen("human_review");
    } else {
      // Add to history
      const newEntry = {
        id: `hist-${Date.now()}`,
        type: "voice",
        title: `Voice: ${consultationData?.structuredSummary?.mainConcern?.slice(0, 35)}...`,
        date: "Today, Just now",
        language: lang,
        languageLabel: lang.toUpperCase(),
        status: "verified",
        statusLabel: "Verified & Saved",
        urgency: "low",
        preview: consultationData?.structuredSummary?.mainConcern || "Voice note consultation",
      };
      setPatientHistory((prev) => [newEntry, ...prev]);
      setActiveScreen("history");
    }
  };

  const handleTriggerHighRiskManually = (riskDetails) => {
    setActiveRiskDetails(riskDetails);
    setActiveScreen("human_review");
  };

  const handleSaveDocToHistory = (docData) => {
    const newEntry = {
      id: `hist-${Date.now()}`,
      type: "document",
      title: `Prescription: ${docData.doctorName}`,
      date: "Today, Just now",
      language: lang,
      languageLabel: lang.toUpperCase(),
      status: "verified",
      statusLabel: "Verified & Simplified",
      urgency: "low",
      preview: docData.extractedData.diagnosis,
    };
    setPatientHistory((prev) => [newEntry, ...prev]);
    setActiveScreen("history");
  };

  const handleAskFollowUpWithDoc = (docData) => {
    setChatContext({
      issue: `Prescription medications: ${docData.extractedData.medications.map((m) => m.name).join(", ")}`,
      recentDoc: docData.title,
    });
    setActiveScreen("chat");
  };

  const handleViewHistoryItem = (item) => {
    if (item.type === "voice") {
      setActiveScreen("review");
    } else if (item.type === "document") {
      setActiveScreen("upload");
    } else {
      setActiveScreen("chat");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-20 md:pb-8">
      {/* Top Header */}
      <Header
        lang={lang}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        textScale={textScale}
        onCycleTextScale={handleCycleTextScale}
        activeScreen={activeScreen}
        onNavigateHome={() => setActiveScreen("home")}
        onToggleStaffView={() =>
          setActiveScreen((prev) => (prev === "staff" ? "home" : "staff"))
        }
        isStaffMode={activeScreen === "staff"}
      />

      {/* Main Viewport Router */}
      <main className="flex-1">
        {activeScreen === "home" && (
          <PatientHome
            lang={lang}
            onSelectLang={handleSelectLang}
            onStartRecording={handleStartRecording}
            onUploadDoc={() => setActiveScreen("upload")}
            onOpenChat={() => setActiveScreen("chat")}
            onViewHistoryItem={handleViewHistoryItem}
            recentActivity={patientHistory}
          />
        )}

        {activeScreen === "record" && (
          <VoiceConsultation
            lang={lang}
            onProceedToProcessing={handleProceedToProcessing}
            onCancel={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "review" && (
          <ClinicalSummaryReview
            lang={lang}
            data={consultationData}
            onConfirmReview={handleConfirmReview}
            onTriggerHighRisk={handleTriggerHighRiskManually}
          />
        )}

        {activeScreen === "upload" && (
          <DocumentFlow
            lang={lang}
            onSaveToHistory={handleSaveDocToHistory}
            onAskFollowUpWithDoc={handleAskFollowUpWithDoc}
          />
        )}

        {activeScreen === "chat" && (
          <FollowUpChat
            lang={lang}
            patientContext={chatContext}
            onNavigateHome={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "human_review" && (
          <HumanReviewAlert
            lang={lang}
            riskDetails={activeRiskDetails}
            onBackToHome={() => setActiveScreen("home")}
          />
        )}

        {activeScreen === "history" && (
          <PatientHistory
            lang={lang}
            historyItems={patientHistory}
            onSelectItem={handleViewHistoryItem}
          />
        )}

        {activeScreen === "staff" && (
          <StaffReviewPortal
            onReturnToPatientView={() => setActiveScreen("home")}
          />
        )}
      </main>

      {/* Stepped Processing Modal Overlay */}
      {isProcessing && (
        <ProcessingModal
          lang={lang}
          onComplete={handleProcessingComplete}
        />
      )}

      {/* Global Language Switcher Modal */}
      <LanguagePickerModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLang={lang}
        onSelectLang={handleSelectLang}
      />

      {/* Emergency Notice Banner (Persistent at bottom) */}
      <div className="fixed bottom-12 md:bottom-0 left-0 right-0 z-30">
        <EmergencyBanner lang={lang} />
      </div>

      {/* Mobile Bottom Thumb-Zone Navigation */}
      <BottomNav
        lang={lang}
        activeScreen={activeScreen}
        onNavigate={(screenId) => setActiveScreen(screenId)}
      />
    </div>
  );
}