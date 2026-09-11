import { useState } from "react";
import {
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  ShieldAlert,
  Send,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { STAFF_TRIAGE_QUEUE } from "../utils/sampleData";

export default function StaffReviewPortal({ onReturnToPatientView }) {
  const [queue, setQueue] = useState(STAFF_TRIAGE_QUEUE);
  const [selectedCase, setSelectedCase] = useState(STAFF_TRIAGE_QUEUE[0]);
  const [staffNote, setStaffNote] = useState("");
  const [auditLogs, setAuditLogs] = useState([
    {
      time: "10:20 AM",
      actor: "Nurse Pratima (Triage Desk)",
      action: "Flagged Sunita Devi consultation as High Urgency (Cardiac/BP)",
    },
    {
      time: "09:45 AM",
      actor: "Dr. Alok (Duty MO)",
      action: "Approved Ananya Mukherjee routine inhaler guidance note",
    },
  ]);

  const handleAction = (actionType) => {
    if (!selectedCase) return;

    let actionLabel = "";
    if (actionType === "approve") {
      actionLabel = `Approved clinical summary for ${selectedCase.patientName}. Transferred to EHR.`;
    } else if (actionType === "clarify") {
      actionLabel = `Requested clarification from ${selectedCase.patientName}: "${staffNote || 'Please verify exact morning BP reading'}".`;
    } else if (actionType === "escalate") {
      actionLabel = `ESCALATED ${selectedCase.patientName} to Emergency Duty Physician (Dr. Gupta).`;
    }

    const newLog = {
      time: "Just now",
      actor: "Nurse Pratima (You)",
      action: actionLabel,
    };

    setAuditLogs((prev) => [newLog, ...prev]);

    // Update status in queue
    setQueue((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id
          ? { ...c, status: actionType === "escalate" ? "Escalated" : "Reviewed" }
          : c
      )
    );

    setSelectedCase((prev) => ({
      ...prev,
      status: actionType === "escalate" ? "Escalated" : "Reviewed",
    }));

    setStaffNote("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-6">
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <UserCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Clinical Staff Triage & Review Portal
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Nurse Pratima (Logged in) • Community Health Center & Hospital Triage
          </p>
        </div>

        <button
          type="button"
          onClick={onReturnToPatientView}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
        >
          Exit to Patient View
        </button>
      </div>

      {/* Main Grid: Queue on Left, Case Review on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Triage Queue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Incoming Review Queue ({queue.length})
            </h3>
            <span className="text-[10px] text-slate-400">Urgency Sorted</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {queue.map((item) => {
              const isSelected = selectedCase?.id === item.id;
              const isHigh = item.urgency === "high";

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`cursor-pointer rounded-xl p-3 border transition-all ${
                    isSelected
                      ? "border-sky-500 bg-sky-50/70 ring-1 ring-sky-300 shadow-xs"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      {item.patientName} ({item.age}{item.gender})
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                        isHigh
                          ? "bg-rose-100 text-rose-800"
                          : item.urgency === "medium"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-teal-100 text-teal-800"
                      }`}
                    >
                      {item.urgency}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                    {item.flagReason}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Language: {item.language}</span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Columns (Span 2): Deep Review Detail */}
        {selectedCase ? (
          <div className="lg:col-span-2 space-y-4">
            {/* Case Banner */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedCase.patientName}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    ({selectedCase.age}y / {selectedCase.gender}) • Spoken: {selectedCase.language}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    Status: {selectedCase.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-rose-700 font-semibold">
                  Flag: {selectedCase.flagReason}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  selectedCase.urgency === "high"
                    ? "bg-rose-600 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {selectedCase.urgency.toUpperCase()} RISK
              </span>
            </div>

            {/* Strict Three-Section Separation */}
            {/* 1. PATIENT DATA */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <span className="inline-block rounded-md bg-sky-100 px-2.5 py-0.5 text-[10px] font-bold text-sky-800 tracking-wider">
                PATIENT DATA (VERBATIM & TRANSLATION)
              </span>
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-800 font-medium leading-relaxed border border-slate-100">
                <p className="italic">
                  "नमस्ते डॉक्टर साहब, मुझे पिछले तीन दिनों से सीने में बीचों-बीच भारीपन और जकड़न महसूस हो रही है। खासकर जब मैं सीढ़ियां चढ़ती हूँ या रात को लेटती हूँ तो सांस फूलने लगती है..."
                </p>
                <div className="mt-2 pt-2 border-t border-slate-200 text-slate-600">
                  <strong>English Translation:</strong> "Hello doctor, for the past 3 days I have been feeling heaviness and tightness in the center of my chest. Especially when I climb stairs or lie down at night, I feel breathless. I take Amlodipine 5mg..."
                </div>
              </div>
            </div>

            {/* 2. AI OUTPUT */}
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-5 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-md bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 tracking-wider">
                  AI OUTPUT (STRUCTURED SUMMARY & HYPOTHESIS)
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">
                  Confidence: 94%
                </span>
              </div>
              <div className="text-xs text-slate-800 space-y-1.5">
                <div>
                  <strong>Reported Symptoms:</strong> {selectedCase.symptoms}
                </div>
                <div>
                  <strong>Clinical Hypothesis:</strong> {selectedCase.aiHypothesis}
                </div>
              </div>
            </div>

            {/* 3. STAFF REVIEW & ACTIONS */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs space-y-4">
              <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 tracking-wider">
                STAFF REVIEW DECISION
              </span>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinician Triage Note:
                </label>
                <textarea
                  value={staffNote}
                  onChange={(e) => setStaffNote(e.target.value)}
                  placeholder="Enter clinical notes, observation, or clarification needed from the patient..."
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Triage Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAction("approve")}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-xs"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Approve Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("clarify")}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-100 active:scale-95 transition-all"
                >
                  <span>Request Clarification</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("escalate")}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700 active:scale-95 transition-all shadow-xs"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Escalate to Physician</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-400">
            Select a patient from the review queue on the left to inspect records.
          </div>
        )}
      </div>

      {/* Audit Trail Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Clinical Audit Trail & Log
        </h4>
        <div className="divide-y divide-slate-100 text-xs text-slate-600">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-semibold text-slate-900">{log.action}</span>
              <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                <span>{log.actor}</span>
                <span>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
