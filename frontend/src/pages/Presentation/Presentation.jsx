import { useParams } from 'react-router-dom';
import PresentationSideBar from '../../components/PresentationSideBar';
import { useState } from 'react';
import editIcon from '../../assets/edit.svg';


export default function Presentation({ token, store }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { presentationId } = useParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const getTitle = () => {
    const presentationInfo = store.presentations.filter(p => p.presentationId === presentationId)[0];
    return presentationInfo.title;
  }

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
            <h1 className="text-4xl">{getTitle()}</h1>
            <img
              src={editIcon}
              alt="Edit Icon"
              className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110 hover:border"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </>
  );
}
