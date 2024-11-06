import { useParams } from 'react-router-dom';
import PresentationSideBar from '../../components/PresentationSideBar';
import { useEffect, useState } from 'react';
import editIcon from '../../assets/edit.svg';
import CreateButton from '../../components/CreateButton';
import Slide from '../../components/Slide';
import UpArrow from '../../components/UpArrow';
import DownArrow from '../../components/DownArrow';

export default function Presentation({ token, store, setStore }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { presentationId } = useParams();
  const presentation = store.presentations.find(presentation => presentation.presentationId === presentationId);
  const slides = presentation.slides
  const [displaySlide, setDisplaySlide] = useState(slides[slides.length-1]);
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
    setIsFirstSlide(currentIndex === 0);
    setIsLastSlide(currentIndex === slides.length - 1);
  }, [displaySlide, slides]);

  const getTitle = () => {
    const presentationInfo = store.presentations.filter(p => p.presentationId === presentationId)[0];
    return presentationInfo.title;
  }
  const moveSlideUp = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
    if (currentIndex > 0) {
      setDisplaySlide(slides[currentIndex - 1]);
    }
    console.log(displaySlide)
  };
  
  const moveSlideDown = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);

    if (currentIndex < slides.length - 1) {
      setDisplaySlide(slides[currentIndex + 1]);
    }
    console.log(displaySlide)

  };
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
          {displaySlide?.slideId ? <Slide displaySlide={displaySlide} /> : null}
          <div className='flex flex-col items-end absolute top-1/2 right-0 transform -translate-y-1/2 mr-2'>
            <CreateButton setDisplaySlide={setDisplaySlide} token={token} store={store} setStore={setStore} presentationId={presentationId} />
            <div className="mt-10 h-8">
              {slides.length > 0 && (
                <div className="mt-10 h-8">
                  <div className={isFirstSlide ? 'invisible' : ''}>
                    <UpArrow onClick={moveSlideUp} />
                  </div>
                  <div className={isLastSlide ? 'invisible' : ''}>
                    <DownArrow onClick={moveSlideDown} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
