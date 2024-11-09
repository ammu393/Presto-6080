import plusIconBlack from "../assets/plusIconBlack.svg";
import plusIconGrey from "../assets/plusIconGrey.svg";
import { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { getStore, putStore } from "../api";
export default function CreateButton({ token, setStore, updateSlide }) {
  const [isHovered, setIsHovered] = useState(false);
  const createNewSlide = async (event) => {
    event.preventDefault();
    const uniqueSlideId = uuidv4();

    const newSlide = {
      slideId: uniqueSlideId,
      elements: [],
    }; 

    updateSlide(newSlide);
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
