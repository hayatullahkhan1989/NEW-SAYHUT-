const REGIONS = [
  {
    name: "North & Central India",
    languages: [
      { code: "hi", label: "हिन्दी", english: "Hindi" },
      { code: "pa", label: "ਪੰਜਾਬੀ", english: "Punjabi" },
      { code: "sa", label: "संस्कृतम्", english: "Sanskrit" },
      { code: "sd", label: "سنڌي", english: "Sindhi" },
      { code: "ur", label: "اردو", english: "Urdu" },
    ],
  },
  {
    name: "East India",
    languages: [
      { code: "as", label: "অসমীয়া", english: "Assamese" },
      { code: "bn", label: "বাংলা", english: "Bengali" },
      { code: "mai", label: "मैथिली", english: "Maithili" },
      { code: "or", label: "ଓଡ଼ିଆ", english: "Odia" },
      { code: "sat", label: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali" },
    ],
  },
  {
    name: "West India",
    languages: [
      { code: "gu", label: "ગુજરાતી", english: "Gujarati" },
      { code: "kok", label: "कोंकणी", english: "Konkani" },
      { code: "mr", label: "मराठी", english: "Marathi" },
    ],
  },
  {
    name: "South India",
    languages: [
      { code: "kn", label: "ಕನ್ನಡ", english: "Kannada" },
      { code: "ml", label: "മലയാളം", english: "Malayalam" },
      { code: "ta", label: "தமிழ்", english: "Tamil" },
      { code: "te", label: "తెలుగు", english: "Telugu" },
    ],
  },
  {
    name: "Himalayan & North-East",
    languages: [
      { code: "brx", label: "बड़ो", english: "Bodo" },
      { code: "doi", label: "डोगरी", english: "Dogri" },
      { code: "ks", label: "کٲشُر", english: "Kashmiri" },
      { code: "mni", label: "ꯃꯤꯇꯩꯂꯣꯟ", english: "Manipuri" },
      { code: "ne", label: "नेपाली", english: "Nepali" },
    ],
  },
];

export default function LanguagePicker({ selected, onSelect }) {
  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto">
      {REGIONS.map((region) => (
        <div key={region.name} className="mb-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
            {region.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {region.languages.map((l) => (
              <button
                key={l.code}
                onClick={() => onSelect(l.code)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border min-w-[70px] ${
                  selected === l.code
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                <span className="text-base">{l.label}</span>
                <span className={`text-[10px] ${selected === l.code ? "text-blue-100" : "text-gray-400"}`}>
                  {l.english}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}