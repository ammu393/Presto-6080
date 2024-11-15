import { useState } from 'react';

export default function ErrorModal({ msg }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const displayMessage = typeof msg === 'object' && msg.message ? msg.message : String(msg);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-lg p-6 max-w-full sm:max-w-lg w-full md:w-2/3 lg:w-1/3 max-h-[90vh] overflow-y-auto"
        aria-label="Error modal"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold">Error</h2>
        <div className="mt-4">
          <p className="text-gray-700">{msg}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

