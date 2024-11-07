import { useState } from 'react';
import { PresentationSideBarItem } from './PresentationSideBarItem';
import trashIcon from '../assets/trash.svg';
import dashboardIcon from '../assets/dashboard.svg';
import editIcon from '../assets/edit.svg';
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationModal } from './ConfirmationModal';
import { putStore } from '../api';
import InputModal from './InputModal';

export default function PresentationSideBar({ token, store, setStore, isSidebarOpen, toggleSidebar, presentation }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [presentationIdToDelete, setPresentationIdToDelete] = useState(null);
  const { presentationId } = useParams();
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  }

  const openDeleteModal = () => {
    setPresentationIdToDelete(presentationId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    if (!presentationIdToDelete) return;

    const updatedPresentations = store.presentations.filter(
      (presentation) => presentation.presentationId !== presentationIdToDelete
    );

    const newStore = { 
      store: { presentations: updatedPresentations } 
    };

    const onSuccess = () => {
      closeDeleteModal();
      goToDashboard();
    }

    await putStore(newStore, token, onSuccess);
  };

  const openThumbnailModal = () => {
    setIsThumbnailModalOpen(true);
  }

  const closeThumbnailModal = () => {
    setIsThumbnailModalOpen(false);
  }

  const handleThumbnailEdit = async (newThumbnail) => {
    const updatedPresentations = store.presentations.map(p => 
      p.presentationId === presentationId ? { ...p, thumbnail: newThumbnail } : p
    );
    
    const newStore = { presentations: updatedPresentations }

    setStore(newStore);
    await putStore({ store: newStore }, token, closeThumbnailModal);
  }

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
            <PresentationSideBarItem text="Edit Thumbnail" icon={editIcon} onClick={openThumbnailModal} />
            <PresentationSideBarItem text="Delete Presentation" icon={trashIcon} onClick={openDeleteModal} />
          </ul>
        </div>
      </aside>
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={handleDeleteConfirmation} 
      />
      <InputModal
        title="Edit Thumbnail" 
        placeholder="Enter Image URL"
        submitText="Save"
        isOpen={isThumbnailModalOpen}
        onClose={closeThumbnailModal}
        onSubmit={handleThumbnailEdit}
      />
    </>
  );
}