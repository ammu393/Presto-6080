import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Logout from '../components/Logout';
import InputModal from './InputModal';
import { putStore } from '../api';
export function DashboardHeader({ token, onPresentationsUpdated, store, setToken }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreatePresentation = async (presentationName) => {
    if (!presentationName.trim()) {
      alert("Please enter a presentation name."); // replace with actual error box 
      return;
    }

    const uniqueId = uuidv4();
    const newPresentation = {
      presentationId: uniqueId,
      thumbnail: "",
      title: presentationName,
      description: "",
      slides: []
    };

    const currentPresentations = store.presentations || [];
    
    const newStore = {
      store: { presentations: [...currentPresentations, newPresentation] },
    };

    await sendPresentationToBackend(newStore);
  };

  const sendPresentationToBackend = async (newStore) => {
    const onSuccess = () => {
      toggleModal();
      onPresentationsUpdated(); 
    }
    await putStore(newStore, token, onSuccess);
  };

  return (
    <header className="flex justify-end bg-[#2f2f33] border-black h-20 p-5">
      <button 
        onClick={toggleModal} 
        className="bg-transparent hover:bg-zinc-700 text-white font-semibold hover:text-white py-2 px-4 rounded"
      >
        New Presentation
      </button>
      <Logout token= { token } setToken={ setToken } />

      {isModalOpen && (
        <InputModal 
          title="Create New Presentation"
          placeholder="Enter Presentation Name"
          submitText="Create"
          isOpen={isModalOpen}
          onClose={toggleModal}
          onSubmit={handleCreatePresentation}
        />
      )}
    </header>
  );
}
