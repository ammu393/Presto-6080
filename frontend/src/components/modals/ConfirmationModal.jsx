export function ConfirmationModal({ isOpen, onClose, onConfirm, title, text }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-4">
          <p className="text-gray-700">{text}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
