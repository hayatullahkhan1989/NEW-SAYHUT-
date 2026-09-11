export default function SplitPaneReview({ facts, interpretation, confidence }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="font-semibold text-gray-800 mb-2">Extracted Facts</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Chief complaint:</strong> {facts.chief_complaint}</li>
          <li><strong>Symptoms:</strong> {facts.symptoms?.join(", ")}</li>
          <li><strong>Duration:</strong> {facts.duration}</li>
          <li><strong>Severity:</strong> {facts.severity}</li>
          <li><strong>Medications mentioned:</strong> {facts.medications_mentioned?.join(", ")}</li>
          <li><strong>Allergies mentioned:</strong> {facts.allergies_mentioned?.join(", ")}</li>
        </ul>
      </div>
      <div className="border-2 border-amber-400 rounded-lg p-4 bg-amber-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-amber-800">AI Interpretation</h3>
          <span className="text-xs bg-amber-200 px-2 py-1 rounded">
            Confidence: {confidence}%
          </span>
        </div>
        <p className="text-sm text-gray-700">{interpretation}</p>
      </div>
    </div>
  );
}