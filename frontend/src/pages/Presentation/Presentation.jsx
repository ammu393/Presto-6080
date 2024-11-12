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
      setDisplaySlide(slides[currentIndex - 1]);
      updateURL(parseInt(slideNum) - 1);
    }
  };
  
  const moveSlideDown = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);

    if (currentIndex < slides.length - 1) {
      setDisplaySlide(slides[currentIndex + 1]);
      updateURL(parseInt(slideNum) + 1);
    }
  };

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
}