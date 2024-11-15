import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Logout from '../components/Logout';
import InputModal from './modals/InputModal';
import { putStore } from '../api';
import { useError } from '../contexts/UseError';
export function DashboardHeader({ token, onPresentationsUpdated, store, setToken }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showError } = useError();

  // Opens and closes new presentation modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Creates a new presentation and updates store
  const handleCreatePresentation = async (presentationName) => {
    if (!presentationName.trim()) {
      showError("Please enter a presentation name.")
      return;
    }

    const uniqueId = uuidv4();
    const newPresentation = {
      presentationId: uniqueId,
      thumbnail: "",
      title: presentationName,
      description: "",
      slides: [],
      backgroundStyle: {
        type: "solid",
        firstColour: "white",
        secondColour: null,
        gradientDirection: null,
        src: null,
      }
    };

    const currentPresentations = store.presentations || [];
    
    const newStore = {
      store: { presentations: [...currentPresentations, newPresentation] },
    };

    await sendPresentationToBackend(newStore);
  };

  // Closes the modal updates data in backend
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
