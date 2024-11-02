import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export function DashboardHeader({ token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentationName, setPresentationName] = useState("");
  const [store, setStore] = useState({ presentations: [] });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreatePresentation = async () => {
    if (!presentationName.trim()) {
      alert("Please enter a presentation name."); // replace with actual error box 
      return;
    }

    const uniqueId = uuidv4();
    const newPresentation = {
      presentationId: uniqueId,
      title: presentationName,
    };

    const newStore = {
      presentations: [...store.presentations, newPresentation],
    };

    console.log("New Store:", newStore);
    await sendPresentationToBackend(newStore);
    setStore(newStore);
    };

  const sendPresentationToBackend = async (newStore) => {
    const dataToSend = {
      store: {
        ...newStore,
      },
    };

    try {
      const response = await axios.put('http://localhost:5005/store', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPresentationName("");
        toggleModal();
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex justify-end bg-[#2f2f33] border-black h-20 p-5">
      <button 
        onClick={toggleModal} 
        className="bg-transparent hover:bg-zinc-700 text-white font-semibold hover:text-white py-2 px-4 rounded"
      >
        New Presentation
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Create New Presentation</h2>
            <input 
              type="text" 
              value={presentationName}
              onChange={(e) => setPresentationName(e.target.value)}
              placeholder="Enter Presentation Name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleCreatePresentation}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                  Create
              </button>
              <button 
                onClick={toggleModal}
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
