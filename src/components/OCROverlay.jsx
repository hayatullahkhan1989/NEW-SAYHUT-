export default function OCROverlay({ imageUrl, boxes, simplifiedText }) {
  return (
    <div className="p-4">
      <div className="relative inline-block">
        <img src={imageUrl} className="max-w-full rounded" alt="scanned document" />
        {boxes.map((b, i) => (
          <div
            key={i}
            style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h }}
            className="border-2 border-yellow-400 bg-yellow-200/30"
          />
        ))}
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Simplified explanation</p>
        <p>{simplifiedText}</p>
      </div>
    </div>
  );
}