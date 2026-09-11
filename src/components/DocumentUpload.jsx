import { useState } from "react";

export default function DocumentUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="flex flex-col items-center p-6">
      {!preview ? (
        <label className="px-6 py-4 bg-blue-600 text-white rounded-lg cursor-pointer">
          📷 Take photo of document
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
        </label>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <img src={preview} className="max-w-xs rounded shadow" alt="document preview" />
          <div className="flex gap-3">
            <button onClick={() => setPreview(null)} className="px-4 py-2 bg-gray-200 rounded">Retake</button>
            <button onClick={() => onUpload(file)} className="px-4 py-2 bg-blue-600 text-white rounded">Use this</button>
          </div>
        </div>
      )}
    </div>
  );
} 