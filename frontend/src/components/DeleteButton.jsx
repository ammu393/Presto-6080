import deleteGrey from "../assets/delete-grey.svg";
import deleteRed from "../assets/delete-red.svg";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { ConfirmationModal } from "./modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { putStore } from "../api";
export default function DeleteButon({ setDisplaySlide, token, store, setStore, presentationId, displaySlide, setSlides, updateURL }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeletePresentationModalOpen, setDeletePresentationModal] = useState(false);
  const [presentationToDelete, setPresentationToDelete] = useState(null);
  const navigate = useNavigate();

  const openDeletePresentationModal = () => setDeletePresentationModal(true);
  const closeDeletePresentationModal = () => setDeletePresentationModal(false);

  // Deletes a presentation
  const handleDeletePresentation = async () => {
    if (!presentationToDelete) return;

    const updatedPresentations = store.presentations.filter(
      (presentation) => presentation.presentationId !== presentationToDelete.presentationId
    );

    const newStore = { 
      store: { presentations: updatedPresentations } 
    };

    const onSuccess = () => {
      closeDeletePresentationModal();
      navigate("/dashboard");
    }

    await putStore(newStore, token, onSuccess);
  };
  
  // Deletes a slide
  const deleteSlide = async (event) => {
    event.preventDefault();

    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(presentation => presentation.presentationId === presentationId);

    if (presentationIndex !== -1) {
      const foundPresentation = currentPresentations[presentationIndex];
      const slideIndex = foundPresentation.slides.findIndex(slide => slide.slideId === displaySlide.slideId);
      if (foundPresentation.slides.length == 1) {
        openDeletePresentationModal();
        setPresentationToDelete(foundPresentation);
        return;
      }
      if (slideIndex === -1) {
        console.error("Slide not found");
        return;
      }

      // Get the previous slide, or default to the first slide if deleting the first one
      const previousSlide = slideIndex > 0 ? foundPresentation.slides[slideIndex - 1] : foundPresentation.slides[slideIndex + 1];

      // Update presentation by removing the current displaySlide
      const updatedSlides = foundPresentation.slides.filter(slide => slide.slideId !== displaySlide.slideId);
      const updatedPresentation = {
        ...foundPresentation,
        slides: updatedSlides,
      };
      setSlides(updatedSlides);

      const newPresentations = [
        ...currentPresentations.slice(0, presentationIndex),
        updatedPresentation,
        ...currentPresentations.slice(presentationIndex + 1),
      ];

      const newStore = {
        store: { presentations: newPresentations },
      };

      updateSlidesAtBackend(newStore);
      setDisplaySlide(previousSlide || null);
      updateURL(slideIndex);
    } else {
      console.error("Presentation not found");
    } 
  };

  // Updates the slides stored in th backend
  const updateSlidesAtBackend = async (newStore) => {
    try {
      const response = await axios.put('http://localhost:5005/store', newStore, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        refreshPresentations();
        console.log("Successfully updated backend");
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Returns the user's presentations
  const fetchPresentations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStore(response.data.store);
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data : error.message);
    }
  }, [token, setStore]);

  const refreshPresentations = useCallback(() => {
    fetchPresentations();
  }, [fetchPresentations]);

  return (
    <div>
      <a href="#" className="flex items-center p-2 text-white rounded-lg ml-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(event) => deleteSlide(event)}
      >
        <img
          src={isHovered ? deleteRed : deleteGrey}
          className="w-12 h-12 transition duration-50"
          aria-label="Delete Slide"
        />
      </a>
      <ConfirmationModal
        isOpen={ isDeletePresentationModalOpen }
        onClose={ closeDeletePresentationModal }
        onConfirm={ handleDeletePresentation }
        title="Last Slide!"
        text="Deleting the last slide will delete the entire presentation. Are you sure you want to proceed?"
      />
    </div>
  );
}
