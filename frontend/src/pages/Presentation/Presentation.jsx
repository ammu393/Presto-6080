import { useNavigate, useParams } from 'react-router-dom';
import PresentationSideBar from '../../components/PresentationSideBar';
import { useEffect, useState } from 'react';
import editIcon from '../../assets/edit.svg';
import CreateButton from '../../components/CreateButton';
import Slide from '../../components/Slide';
import UpArrow from '../../components/UpArrow';
import DownArrow from '../../components/DownArrow';
import InputModal from '../../components/modals/InputModal';
import { putStore } from '../../api';
import DeleteButon from '../../components/DeleteButton';

export default function Presentation({ token, store, setStore }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { presentationId } = useParams();
  const { slideNum } = useParams();
  const presentation = store.presentations.find(presentation => presentation.presentationId === presentationId);
  const [slides, setSlides] = useState(presentation ? presentation.slides : []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displaySlide, setDisplaySlide] = useState(slides[slideNum - 1]);
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    if (presentation) {
      const slideIndex = parseInt(slideNum, 10) - 1;
      setIsFirstSlide(slideIndex === 0);
      setIsLastSlide(slideIndex === slides.length - 1);
    }
  }, [slideNum]);

  useEffect(() => {
    if (presentation) {
      const slideIndex = parseInt(slideNum, 10) - 1;
      setSlides(presentation.slides);
      setDisplaySlide(presentation.slides[slideIndex] || null);
    }
  }, [presentation])

  const getTitle = () => {
    const presentationInfo = store.presentations.filter(p => p.presentationId === presentationId)[0];
    return presentationInfo ? presentationInfo.title : "";
  }
  const moveSlideUp = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setDisplaySlide(slides[currentIndex - 1]);
      updateURL(parseInt(slideNum) - 1);
    }
  };
  
  const moveSlideDown = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);

    if (currentIndex < slides.length - 1) {
      setIsTransitioning(true);
      setDisplaySlide(slides[currentIndex + 1]);
      updateURL(parseInt(slideNum) + 1);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200); 
    }
  }, [isTransitioning]);

  const updateURL = (slideNumber) => {
    const newURL = `/presentations/${presentationId}/${slideNumber}`;
    navigate(newURL, { replace: true });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTitleUpdate = async (newTitle) => {
    const updatedPresentations = store.presentations.map(p => 
      p.presentationId === presentationId ? { ...p, title: newTitle } : p
    );
  
    const newStore = { presentations: updatedPresentations };
    
    setStore(newStore);
    await putStore({ store: newStore }, token, toggleModal);
  };

  const addElementToSlide = (element, currentSlide) => {
    console.log(currentSlide);
    const existingElementIndex = currentSlide.elements.findIndex(e => e.elementId === element.elementId);
  
    let updatedSlide;
  
    if (existingElementIndex !== -1) {
      const updatedElements = [...currentSlide.elements];
      updatedElements[existingElementIndex] = {
        ...updatedElements[existingElementIndex],
        top: element.top,  
        left: element.left, 
        width: element.width,
        height: element.height
      };
  
      updatedSlide = {
        ...currentSlide,
        elements: updatedElements,
      };
    } else {
      updatedSlide = {
        ...currentSlide,
        elements: [...currentSlide.elements, element],
      };
    }
  
    updateSlide(updatedSlide);
  };

  const updateSlideFont = (newFont, currentSlide) => {
    const updatedSlide = {
      ...currentSlide, 
      fontFamily: newFont,
    };
    updateSlide(updatedSlide);
  }

  const deleteElementFromSlide = async (elementId) => {
    const updatedSlide = {
      ...displaySlide, 
      elements: displaySlide.elements.filter(e => e.elementId !== elementId),
    };
    await updateSlide(updatedSlide);
    return updatedSlide;
  }

  const updatePresentationStore = async (updatedPresentation) => {
    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(
      (presentation) => presentation.presentationId === presentationId
    );
  
    if (presentationIndex === -1) {
      console.error("Presentation not found");
      return;
    }
  
    const updatedPresentations = currentPresentations.map((presentation, index) =>
      index === presentationIndex ? updatedPresentation : presentation
    );
  
    const newStore = { presentations: updatedPresentations };
    setStore(newStore);
    await putStore({ store: newStore }, token);
  };
  
  const updateSlidesInPresentation = (slidesArray, newSlide) => {
    const slideIndex = slidesArray.findIndex((slide) => slide.slideId === newSlide.slideId);
    return slideIndex !== -1
      ? slidesArray.map((slide, index) => (index === slideIndex ? newSlide : slide))
      : slidesArray;
  };
  
  const updateSlide = async (newSlide) => {
    setDisplaySlide(newSlide);
  
    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(
      (presentation) => presentation.presentationId === presentationId
    );
  
    const foundPresentation = { ...currentPresentations[presentationIndex] };
    const updatedSlidesArray = updateSlidesInPresentation(foundPresentation.slides || [], newSlide);
    const updatedPresentation = { ...foundPresentation, slides: updatedSlidesArray };
  
    await updatePresentationStore(updatedPresentation);
    setSlides(updatedSlidesArray);
  };
  
  const updateBackground = async (newBackgroundInfo, isDefault) => {
    const newSlide = { ...displaySlide, backgroundStyle: newBackgroundInfo };
    
    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(
      (presentation) => presentation.presentationId === presentationId
    );
  
    const foundPresentation = { ...currentPresentations[presentationIndex] };
    
    if (isDefault) {
      foundPresentation.backgroundStyle = newBackgroundInfo;
    }
  
    const updatedSlidesArray = updateSlidesInPresentation(foundPresentation.slides || [], newSlide);
    const updatedPresentation = { ...foundPresentation, slides: updatedSlidesArray };
  
    await updatePresentationStore(updatedPresentation);
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

        <PresentationSideBar token={token} store={store} setStore={setStore} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} addElementToSlide={addElementToSlide} displaySlide={displaySlide} updateBackground={updateBackground} updateSlideFont={updateSlideFont}/>
        <div className="flex-1 p-8 bg-gray-100 relative">
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
              aria-label="Edit Icon"
              className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110 hover:border"
              tabIndex={0}
              onClick={toggleModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  toggleModal();
                }
              }}
            />
            {slides.length > 0 && (
              <div className="h-5 mb-2 flex flex-row ml-auto">
                <div className={isFirstSlide ? 'invisible' : ''}>
                  <UpArrow onClick={moveSlideUp} />
                </div>
                <div className={isLastSlide ? 'invisible' : ''}>
                  <DownArrow onClick={moveSlideDown} />
                </div>
              </div>
            )}
          </div>

          <div className={`flex flex-row gap-6 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 ease-in`}>
            {displaySlide && (
              <Slide 
                displaySlide={displaySlide} 
                slides = {slides}
                addElementToSlide={addElementToSlide}
                deleteElementFromSlide={deleteElementFromSlide}
                presentation={presentation}
              />
            )}
          </div>            
          <div className='h-full flex flex-col absolute bottom-0 right-0 justify-center items-center pr-1  pb-5'>
            <div className="h-8">
              <CreateButton setDisplaySlide={setDisplaySlide} token={token} store={store} setStore={setStore} presentationId={presentationId} setSlides={setSlides} updateURL={updateURL}/>
              <DeleteButon setDisplaySlide={setDisplaySlide} token={token} store={store} setStore={setStore} presentationId={presentationId} displaySlide={displaySlide} setSlides={setSlides} updateURL={updateURL} className="mt-5"/>
            </div>
          </div>
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
    </>
  );
}