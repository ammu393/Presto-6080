import { useState } from 'react';

export default function RevisionHistoryModal({ isOpen, onClose, presentationId, store, setStore }) {
  const presentation = store.presentations.find(p => p.presentationId === presentationId);
  const [snapshots, setSnapshots] = useState(presentation?.revisionHistory || []);
  
  const handleRestore = (snapshot) => {
    const updatedPresentations = store.presentations.map(p =>
      p.presentationId === presentationId ? { ...p, slides: snapshot.slides } : p
    );

    setStore({ presentations: updatedPresentations });
    onClose();
  };

  return (
    isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
            <div className="bg-white rounded-lg p-6 w-full max-w-md sm:w-2/3 lg:w-1/3">
            <h2 className="text-lg font-bold mb-4 text-center">History</h2>
        <ul>
          {snapshots.map((snapshot, index) => (
            <li key={index}>
              <button onClick={() => handleRestore(snapshot)}>
                {new Date(snapshot.timestamp).toLocaleString()}
              </button>
            </li>
          ))}
        </ul>
        <button 
        onClick={onClose}
        className="bg-gray-300 text-gray-800 hover:bg-red-500 font-semibold py-2 px-4 rounded"
        >
            Close
        </button>
      </div>
      </div>
    )
  );
}