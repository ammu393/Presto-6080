import { useState } from 'react';
import { PresentationSideBarItem } from './PresentationSideBarItem';
import trashIcon from '../assets/trash.svg';
import dashboardIcon from '../assets/dashboard.svg';
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationModal } from './ConfirmationModal';
import axios from 'axios';

export default function PresentationSideBar({ token, store, isSidebarOpen, toggleSidebar }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [presentationIdToDelete, setPresentationIdToDelete] = useState(null);
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  }

  const openModal = () => {
    setPresentationIdToDelete(presentationId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    if (!presentationIdToDelete) return;

    const updatedPresentations = store.presentations.filter(
      (presentation) => presentation.presentationId !== presentationIdToDelete
    );

    const newStore = { 
      store: { presentations: updatedPresentations } 
    };

    try {
      const response = await axios.put('http://localhost:5005/store', newStore, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        closeModal();
        goToDashboard();
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error("Failed to delete presentation:", error);
    }
  };


  return (
    <>
      <aside
        id="default-sidebar"
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed sm:relative top-0 left-0 z-40 w-64 h-screen sm:h-auto transition-transform bg-[#222225] dark:bg-gray-800 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white sm:hidden"
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
        </button>
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#222225] dark:bg-gray-800 z-50">
          <ul className="space-y-2 font-medium">
            <PresentationSideBarItem text="Back to Dashboard" icon={dashboardIcon} onClick={goToDashboard} />
            <PresentationSideBarItem text="Delete Presentation" icon={trashIcon} onClick={openModal} />
          </ul>
        </div>
      </aside>
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onConfirm={handleDeleteConfirmation} 
      />
    </>
  );
}