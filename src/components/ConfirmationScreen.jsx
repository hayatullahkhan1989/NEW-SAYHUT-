export default function ConfirmationScreen({ transcript, audioUrl, onSubmit, onEdit }) {
  return (
    <div className="p-6 text-center">
      <p className="text-lg mb-4">Is this what you said?</p>
      <p className="italic text-gray-700 mb-4">"{transcript}"</p>
      <audio controls autoPlay src={audioUrl} className="mb-4" />
      <div className="flex justify-center gap-4">
        <button onClick={onEdit} className="px-4 py-2 bg-gray-200 rounded">Try again</button>
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Yes, submit</button>
      </div>
    </div>
  );
}