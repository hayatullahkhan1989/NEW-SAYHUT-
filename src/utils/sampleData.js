export const SAMPLE_VOICE_CONSULTATIONS = {
  hi: {
    id: "cons-101",
    patientName: "Sunita Devi",
    age: 54,
    gender: "Female",
    recordedAt: "Today, 10:15 AM",
    durationSec: 42,
    language: "hi",
    languageLabel: "हिन्दी (Hindi)",
    originalTranscript: "नमस्ते डॉक्टर साहब, मुझे पिछले तीन दिनों से सीने में बीचों-बीच भारीपन और जकड़न महसूस हो रही है। खासकर जब मैं सीढ़ियां चढ़ती हूँ या रात को लेटती हूँ तो सांस फूलने लगती है। सूखी खांसी भी आ रही है। मुझे दो साल से हाई बीपी (रक्तचाप) की शिकायत है, जिसके लिए मैं रोज़ सुबह एम्लोडिपिन 5mg गोली लेती हूँ। बुखार नहीं है लेकिन बहुत घबराहट हो रही है।",
    englishTranscript: "Hello doctor, for the past 3 days I have been feeling heaviness and tightness in the center of my chest. Especially when I climb stairs or lie down at night, I feel breathless. I also have a dry cough. I have had high blood pressure for 2 years, for which I take Amlodipine 5mg every morning. I don't have fever, but I feel very anxious.",
    audioLength: "00:42",
    structuredSummary: {
      mainConcern: "Chest heaviness and breathlessness on exertion for 3 days",
      symptoms: [
        "Centrosternal chest heaviness & tightness",
        "Shortness of breath (exertional & orthopnea)",
        "Dry cough (worse at night)",
        "Marked anxiety / restlessness"
      ],
      duration: "3 days (acute onset)",
      severity: "Moderate to severe (exacerbated by climbing stairs and recumbency)",
      relevantHistory: "Essential Hypertension for 2 years",
      medicinesMentioned: [
        "Tab. Amlodipine 5mg (once daily, morning - compliant)"
      ],
      missingOrUnconfirmed: [
        "Exact blood pressure reading today (Not confirmed)",
        "Fever temperature reading (Reported absent, unverified)",
        "History of diabetes mellitus (Not enough information)"
      ],
      otherImportantInfo: "Symptoms worsen on minimal exertion. Requires clinical auscultation and ECG."
    },
    aiInterpretation: {
      summary: "Patient presents with subacute exertional chest tightness and orthopnea against a background of chronic hypertension. While dry cough could reflect reactive airway irritation or an early cardiac decompensation indicator, cardiac etiology (angina equivalent or hypertensive cardiac stress) must be prioritized and ruled out.",
      confidence: 94,
      disclaimer: "This educational interpretation is synthesized by AI to assist clinical review. It is NOT a medical diagnosis and cannot replace an in-person doctor evaluation."
    },
    isHighRisk: true,
    riskDetails: {
      reason: "Potential acute cardiovascular / hypertensive cardiac stress",
      triggerPhrase: "Chest tightness for 3 days worsening on stairs and lying down with breathlessness",
      level: "High Priority - Immediate Clinical Review",
      recommendedAction: "Perform resting 12-lead ECG, assess troponin levels, check current BP, auscultate lung bases."
    }
  },
  en: {
    id: "cons-102",
    patientName: "Rajesh Kumar",
    age: 62,
    gender: "Male",
    recordedAt: "Today, 09:30 AM",
    durationSec: 36,
    language: "en",
    languageLabel: "English",
    originalTranscript: "Doctor, I've had a recurring dull ache on the right side of my abdomen for about five days. It usually gets sharper two hours after eating oily food. I also noticed mild nausea in the mornings, but no vomiting. I take Metformin 500mg twice a day for Type 2 diabetes. My blood sugar yesterday fasting was 138 mg/dL.",
    englishTranscript: "Doctor, I've had a recurring dull ache on the right side of my abdomen for about five days. It usually gets sharper two hours after eating oily food. I also noticed mild nausea in the mornings, but no vomiting. I take Metformin 500mg twice a day for Type 2 diabetes. My blood sugar yesterday fasting was 138 mg/dL.",
    audioLength: "00:36",
    structuredSummary: {
      mainConcern: "Right upper quadrant abdominal discomfort post-prandial for 5 days",
      symptoms: [
        "Dull right-sided abdominal ache (sharp after fatty meals)",
        "Morning nausea (without emesis)",
        "Fasting blood sugar elevated (138 mg/dL)"
      ],
      duration: "5 days",
      severity: "Mild to moderate (post-prandial exacerbation)",
      relevantHistory: "Type 2 Diabetes Mellitus (managed on oral hypoglycemics)",
      medicinesMentioned: [
        "Tab. Metformin 500mg (1-0-1, twice daily)"
      ],
      missingOrUnconfirmed: [
        "History of gallstones or cholelithiasis (Not confirmed)",
        "Presence of jaundice or scleral icterus (Not enough information)",
        "Lipid panel results (Not confirmed)"
      ],
      otherImportantInfo: "Post-prandial pain following fatty food raises suspicion of biliary colic."
    },
    aiInterpretation: {
      summary: "Clinical presentation of right upper quadrant discomfort precipitated by fatty food intake in a diabetic patient is suspicious for biliary pathology (e.g. symptomatic cholelithiasis) or functional dyspepsia. Liver function tests and an abdominal ultrasound are recommended.",
      confidence: 89,
      disclaimer: "AI-generated educational summary. Always consult your attending doctor for differential diagnosis."
    },
    isHighRisk: false,
    riskDetails: null
  }
};

export const SAMPLE_DOCUMENTS = [
  {
    id: "doc-01",
    title: "Dr. A. Verma - Prescription",
    doctorName: "Dr. Amit Verma, MD (Internal Medicine)",
    clinic: "Apollo Clinic & Diagnostic Center",
    date: "10-Sep-2026",
    fileType: "Prescription Slip",
    extractedData: {
      diagnosis: "Type 2 Diabetes Mellitus with Essential Hypertension",
      vitals: "BP: 142/88 mmHg | Pulse: 78 bpm | Wt: 68 kg",
      medications: [
        {
          name: "Tab. Metformin HCl",
          strength: "500 mg",
          timing: "1-0-1",
          instructions: "Take 1 tablet after breakfast and 1 tablet after dinner with water.",
          purpose: "Controls blood sugar level"
        },
        {
          name: "Tab. Telmisartan",
          strength: "40 mg",
          timing: "1-0-0",
          instructions: "Take 1 tablet in the morning after breakfast.",
          purpose: "Controls high blood pressure"
        },
        {
          name: "Tab. Atorvastatin",
          strength: "10 mg",
          timing: "0-0-1",
          instructions: "Take 1 tablet at night before bedtime.",
          purpose: "Reduces bad cholesterol"
        }
      ],
      dietAdvice: "Low salt diet (< 5g/day), reduce refined carbohydrates and sugar, brisk walk 30 mins daily.",
      followUp: "Review after 3 weeks with Fasting Blood Sugar and HbA1c reports."
    },
    simplifiedExplanation: {
      en: {
        summary: "Dr. Verma prescribed 3 medicines to protect your heart and balance your blood sugar.",
        medList: [
          "1. Metformin (500mg): Take twice daily after meals (morning and night) to keep your sugar normal.",
          "2. Telmisartan (40mg): Take once in the morning to protect your heart and keep blood pressure steady.",
          "3. Atorvastatin (10mg): Take 1 tablet every night before bed to protect your blood vessels from cholesterol build-up."
        ],
        lifestyle: "Eat less salt and sugar. Walk for 30 minutes every day.",
        nextVisit: "Get your blood sugar test done and see the doctor again in 3 weeks."
      },
      hi: {
        summary: "डॉ. वर्मा ने आपके दिल और शुगर के स्तर को ठीक रखने के लिए 3 मुख्य दवाएं लिखी हैं:",
        medList: [
          "1. मेटफ़ॉर्मिन (500mg): दिन में दो बार खाने के बाद (सुबह और रात) लें, यह ब्लड शुगर को नियंत्रित रखेगी।",
          "2. टेलमिसार्टन (40mg): रोज़ सुबह नाश्ते के बाद 1 गोली लें, यह आपके रक्तचाप (बीपी) को नियंत्रित रखेगी।",
          "3. एटोरवास्टेटिन (10mg): रोज़ रात को सोने से पहले 1 गोली लें, यह कोलेस्ट्रॉल को कम रखेगी।"
        ],
        lifestyle: "भोजन में नमक और चीनी कम करें। रोज़ाना 30 मिनट टहलें।",
        nextVisit: "3 हफ़्ते बाद खाली पेट शुगर की जांच कराकर डॉक्टर को दोबारा दिखाएं।"
      }
    }
  },
  {
    id: "doc-02",
    title: "Dr. S. Sundaram - Respiratory Note",
    doctorName: "Dr. S. Sundaram, MD (Pulmonology)",
    clinic: "City Chest & Allergy Care",
    date: "08-Sep-2026",
    fileType: "Outpatient Card",
    extractedData: {
      diagnosis: "Bronchial Asthma with Seasonal Allergic Rhinitis",
      vitals: "SpO2: 97% on room air | Peak Expiratory Flow: 380 L/min",
      medications: [
        {
          name: "Inhaler Budesonide + Formoterol",
          strength: "200/6 mcg",
          timing: "2 puffs BD",
          instructions: "Rinse mouth thoroughly with water after inhalation.",
          purpose: "Reduces airway inflammation and eases breathing"
        },
        {
          name: "Tab. Montelukast + Levocetirizine",
          strength: "10/5 mg",
          timing: "0-0-1",
          instructions: "Take 1 tablet at night.",
          purpose: "Controls allergy symptoms and night cough"
        }
      ],
      dietAdvice: "Avoid cold beverages, ice cream, and exposure to dust or smoke.",
      followUp: "Review if breathlessness worsens or night awakenings occur."
    },
    simplifiedExplanation: {
      en: {
        summary: "This prescription is for treating allergic asthma and airway swelling.",
        medList: [
          "1. Inhaler (Budesonide + Formoterol): Take 2 puffs in the morning and 2 puffs at night. Always rinse your mouth with water after each use.",
          "2. Montelukast-Levocetirizine: Take 1 tablet at night to prevent allergy and nighttime coughing."
        ],
        lifestyle: "Stay away from cold drinks, dust, and smoke.",
        nextVisit: "Contact clinic immediately if breathing becomes tight despite using the inhaler."
      },
      hi: {
        summary: "यह पर्चा सांस की एलर्जी और खांसी से राहत देने के लिए है:",
        medList: [
          "1. इनहेलर (दवा सूंघने वाला): सुबह 2 पफ और रात को 2 पफ लें। दवा लेने के तुरंत बाद पानी से कुल्ला अवश्य करें।",
          "2. मोंटेलुकास्ट गोली: रात को 1 गोली लें ताकि रात में खांसी न उठे और सांस खुली रहे।"
        ],
        lifestyle: "ठंडे पेय, धूल और धुएं से बचें।",
        nextVisit: "यदि इनहेलर लेने के बाद भी सांस फूलती है तो तुरंत डॉक्टर से संपर्क करें।"
      }
    }
  }
];

export const INITIAL_PATIENT_HISTORY = [
  {
    id: "hist-01",
    type: "voice",
    title: "Voice Consultation: Chest heaviness & breathlessness",
    date: "Today, 10:15 AM",
    language: "hi",
    languageLabel: "हिन्दी",
    status: "awaiting_review",
    statusLabel: "Awaiting Staff Review",
    urgency: "high",
    preview: "3 days chest heaviness worsening on stairs, dry cough, taking Amlodipine 5mg."
  },
  {
    id: "hist-02",
    type: "document",
    title: "Prescription: Dr. Amit Verma (Diabetes & BP)",
    date: "10-Sep-2026",
    language: "hi",
    languageLabel: "हिन्दी",
    status: "verified",
    statusLabel: "Verified & Simplified",
    urgency: "low",
    preview: "Metformin 500mg (twice daily), Telmisartan 40mg (morning), Atorvastatin 10mg (night)."
  },
  {
    id: "hist-03",
    type: "chat",
    title: "Follow-up: Medicine timing before vs after food",
    date: "09-Sep-2026",
    language: "en",
    languageLabel: "English",
    status: "completed",
    statusLabel: "Completed",
    urgency: "low",
    preview: "Confirmed Metformin should be taken with or right after meals to avoid stomach upset."
  }
];

export const STAFF_TRIAGE_QUEUE = [
  {
    id: "triage-01",
    patientName: "Sunita Devi",
    age: 54,
    gender: "F",
    language: "Hindi",
    timeAgo: "4 mins ago",
    urgency: "high",
    flagReason: "Red-Flag: Centrosternal chest heaviness & orthopnea in hypertensive patient",
    symptoms: "Chest tightness (3 days), exertional dyspnea, dry cough, takes Amlodipine 5mg",
    aiHypothesis: "Potential acute coronary syndrome or hypertensive left ventricular strain",
    status: "Pending Review",
    assignedTo: "Nurse Pratima (Triage Desk)"
  },
  {
    id: "triage-02",
    patientName: "Rameshwar Patel",
    age: 48,
    gender: "M",
    language: "Gujarati",
    timeAgo: "18 mins ago",
    urgency: "medium",
    flagReason: "Medication Ambiguity: Conflicting dosage reported between oral note and old Rx",
    symptoms: "Reports taking Glycomet 1000mg instead of prescribed 500mg, feeling shaky",
    aiHypothesis: "Possible drug dose duplication / early hypoglycemia symptom",
    status: "Pending Review",
    assignedTo: "Dr. Alok (Duty MO)"
  },
  {
    id: "triage-03",
    patientName: "Ananya Mukherjee",
    age: 29,
    gender: "F",
    language: "Bengali",
    timeAgo: "45 mins ago",
    urgency: "low",
    flagReason: "Routine Document Clarification: Inhaler technique follow-up",
    symptoms: "Mild throat dryness after Budesonide inhaler",
    aiHypothesis: "Local oral deposition due to omitting post-inhalation mouth rinse",
    status: "Approved",
    assignedTo: "Nurse Pratima (Triage Desk)"
  }
];
