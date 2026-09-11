export default function AuditTrailView({ logs }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Time</th>
          <th className="p-2">Actor</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((l, i) => (
          <tr key={i} className="border-b">
            <td className="p-2">{l.timestamp}</td>
            <td className="p-2">{l.actor}</td>
            <td className="p-2">{l.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}