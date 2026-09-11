export default function TTSPlayer({ audioUrl, label }) {
  if (!audioUrl) return null;
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      {label && <p className="text-sm text-gray-600 mb-1">{label}</p>}
      <audio controls src={audioUrl} className="w-full" />
    </div>
  );
}