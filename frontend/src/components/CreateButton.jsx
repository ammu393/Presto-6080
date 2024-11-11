import plusIconBlack from "../assets/plusIconBlack.svg";
import plusIconGrey from "../assets/plusIconGrey.svg";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function CreateButton({ setDisplaySlide, token, store, presentationId, setStore, setSlides, updateURL}) {
  const [isHovered, setIsHovered] = useState(false);
  const createNewSlide = async (event) => {
    event.preventDefault();
    const uniqueSlideId = uuidv4();

    const newSlide = {
      slideId: uniqueSlideId,
      elements: [],
    }; 
    console.log("this is the new slide" + newSlide)
    console.log("this is the new slide id " + newSlide.slideId)

    setDisplaySlide(newSlide)
    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(presentation => presentation.presentationId === presentationId);

    if (presentationIndex !== -1) {
      const foundPresentation = currentPresentations[presentationIndex];
      const updatedSlides = [...(foundPresentation.slides || []), newSlide];

      console.log("Found Presentation:", foundPresentation);
      setSlides(updatedSlides);

      // Create a new updated presentation
      const updatedPresentation = {
        ...foundPresentation,
        slides: [...(foundPresentation.slides || []), newSlide],
      };

      // Create a new presentations array with the updated presentation
      const newPresentations = [
        ...currentPresentations.slice(0, presentationIndex), // All presentations before the found one
        updatedPresentation, // The updated presentation
        ...currentPresentations.slice(presentationIndex + 1) // All presentations after the found one
      ];

      const newStore = {
        store: { presentations: newPresentations },
      };

      await updateSlidesAtBackend(newStore);

      setDisplaySlide(newSlide);
      updateURL(parseInt(foundPresentation.slides.length) + 1);
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
        refreshPresentations()
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
        console.log(response);
        setStore(response.data.store);
      } else {
        console.log("Error: ", response.data);
      }
    } catch (error) {
      console.error("An error occurred:", error.response ? error.response.data : error.message);
    }
  }, [token, setStore]);

  // UseEffect to fetch presentations on component mount and token change
  useEffect(() => {
    fetchPresentations();
  }, [fetchPresentations]);

  // Function to refresh presentations when a new one is created
  const refreshPresentations = () => {
    fetchPresentations();
  };

    
  return (
    <a href="#" className="flex items-center p-2 text-white rounded-lg ml-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(event) => {
        createNewSlide(event);  // First, create the new slide
      }}       
    >
      <img src={isHovered ? plusIconBlack : plusIconGrey} className="w-12 h-12 transition duration-50" alt="Add Slide" />
    </a>
  );
}
