import deleteGrey from "../assets/delete-grey.svg";
import deleteRed from "../assets/delete-red.svg";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";


export default function DeleteButon({ setDisplaySlide, token, store, setStore, presentationId, displaySlide }) {
    const [isHovered, setIsHovered] = useState(false);
  
    const deleteSlide = async (event) => {
        event.preventDefault();
      
        const currentPresentations = store.presentations || [];
        const presentationIndex = currentPresentations.findIndex(presentation => presentation.presentationId === presentationId);
      
        if (presentationIndex !== -1) {
          const foundPresentation = currentPresentations[presentationIndex];
          const slideIndex = foundPresentation.slides.findIndex(slide => slide.slideId === displaySlide.slideId);
      
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
            numSlides: updatedSlides.length,
            slides: updatedSlides,
          };
      
          const newPresentations = [
            ...currentPresentations.slice(0, presentationIndex),
            updatedPresentation,
            ...currentPresentations.slice(presentationIndex + 1),
          ];
      
          const newStore = {
            store: { presentations: newPresentations },
          };
      
          await updateSlidesAtBackend(newStore);
      
          // Set the previous slide as the new displaySlide
          setDisplaySlide(previousSlide || null);
        } else {
          console.error("Presentation not found");
        }
      };
  
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
  

  
    useEffect(() => {
      fetchPresentations();
    }, [fetchPresentations]);
  
    return (
      <div>
        <a href="#" className="flex items-center p-2 text-white rounded-lg ml-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(event) => deleteSlide(event)}
        >
          <img src={isHovered ? deleteRed : deleteGrey} className="w-12 h-12 transition duration-50" alt="Add Slide" />
        </a>
      </div>
    );
  }
