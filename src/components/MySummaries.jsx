const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-green-100 text-green-700",
  actioned: "bg-blue-100 text-blue-700",
};

export default function MySummaries({ summaries }) {
  return (
    <div className="p-4 space-y-3">
      {summaries.map((s) => (
        <div key={s.id} className="border rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="font-medium">{s.chief_complaint}</p>
            <p className="text-xs text-gray-500">{s.date}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[s.status]}`}>
            {s.status}
          </span>
        </div>
      ))}
    </div>
  );
}