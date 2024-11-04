import { useState } from 'react';
import { PresentationSideBarItem } from './PresentationSideBarItem';
import trashIcon from '../assets/trash.svg';
import dashboardIcon from '../assets/dashboard.svg';
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationModal } from './ConfirmationModal';
import axios from 'axios';

export default function PresentationSideBar({ token, store }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [presentationIdToDelete, setPresentationIdToDelete] = useState(null);
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

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
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#222225] dark:bg-gray-800">
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