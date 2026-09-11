import { useRef, useState } from "react";

export default function DocumentUpload() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    console.log("Selected file:", file.name, file.type, file.size);
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-semibold text-slate-800">Upload Documents</h2>

      <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 p-6 text-center">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Choose file
        </button>

        <p className="mt-4 text-sm text-slate-500">
          Supported: PDF, JPG, PNG
        </p>
      </div>

      {selectedFile && (
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="font-medium text-slate-800">Selected file</p>
          <p className="text-slate-600">{selectedFile.name}</p>
          <p className="text-sm text-slate-500">
            {selectedFile.type || "Unknown type"} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </div>
  );
}