import { useParams } from 'react-router-dom';
import PresentationSideBar from '../../components/PresentationSideBar';
import { useEffect, useState } from 'react';
import editIcon from '../../assets/edit.svg';
import InputModal from '../../components/InputModal';
import { putStore } from '../../api';

export default function Presentation({ token, store, setStore }) {
  const { presentationId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presentationInfo, setPresentationInfo] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTitleUpdate = async (newTitle) => {
    const updatedPresentationInfo = { 
      presentationId: presentationId,
      title: newTitle,
      description: presentationInfo.description,
      slides: presentationInfo.slides,
    };
    console.log(presentationInfo)
    setPresentationInfo(updatedPresentationInfo);
    console.log(updatedPresentationInfo)

    // Create a new array of presentations with the updated title
    const updatedPresentations = store.presentations.map(p => {
      if (p.presentationId === presentationId) {
        return updatedPresentationInfo; // Return the updated presentation object
      }
      return p; // Return the original presentation object if it doesn't match
    });
    const newStore = { presentations: updatedPresentations }
    setStore(newStore);
    console.log(newStore)
    await putStore({ store: newStore }, token, toggleModal);
  };

  useEffect(() => {
    const getPresentationInfo = () => {
      const presentation = store.presentations.find(
        (p) => p.presentationId === presentationId
      );
      return presentation || {};
    };

    console.log(store);

    setPresentationInfo(getPresentationInfo());
  }, [presentationId, store.presentations]);

  return (
    <>
      <div className="flex h-screen">
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className="fixed top-2 left-2 inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        <PresentationSideBar token={token} store={store} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 p-8 bg-gray-100">
          <button
            onClick={toggleSidebar}
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
          <div className="flex flex-row gap-6">
            <h1 className="text-4xl">{presentationInfo.title}</h1>
            <img
              src={editIcon}
              alt="Edit Icon"
              className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110 hover:border"
              tabIndex={0}
              onClick={toggleModal}
            />
          </div>
        </div>
        {isModalOpen && (
          <InputModal 
            title="Edit Presentation Title"
            placeholder="Enter New Title"
            submitText="Submit"
            isOpen={isModalOpen}
            onClose={toggleModal}
            onSubmit={handleTitleUpdate}
          />
        )}
      </div>
    </>
  );
}
