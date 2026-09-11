const URGENCY_COLOR = { high: "border-red-500", medium: "border-yellow-500", low: "border-gray-300" };

export default function RiskQueue({ items, onApprove, onEdit, onReject }) {
  return (
    <div className="p-4 space-y-3">
      {items.map((item) => (
        <div key={item.id} className={`border-l-4 ${URGENCY_COLOR[item.urgency]} bg-white rounded-lg shadow-sm p-3`}>
          <p className="font-medium">{item.summary}</p>
          <p className="text-xs text-gray-500 mb-2">Flag: {item.flagReason}</p>
          <div className="flex gap-2">
            <button onClick={() => onApprove(item.id)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
            <button onClick={() => onEdit(item.id)} className="px-3 py-1 bg-gray-200 rounded text-sm">Edit</button>
            <button onClick={() => onReject(item.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}