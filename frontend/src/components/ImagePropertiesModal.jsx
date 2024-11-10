import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ImagePropertiesModal({ isOpen, closeImageModal, addElementToSlide, deleteElementFromSlide, displaySlide, currentElement }) {
  if (!isOpen) return null;

  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (currentElement) {
      setUrl(currentElement.url || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setTop(parseFloat(currentElement.top.replace(/%/g, "")) || 0);
      setLeft(parseFloat(currentElement.left.replace(/%/g, "")) || 0);
    }
  }, [currentElement, displaySlide]);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    
    let slideToUpdate = displaySlide;
    if (currentElement) {
      slideToUpdate = await deleteElementFromSlide(currentElement.elementId);
    }
  
    addElementToSlide(
      {
        elementId: uuidv4(),
        type: "image",
        src: url,
        alt: alt,
        width: `${width}%`,
        height: `${height}%`,
        top: `${top}%`,
        left: `${left}%`,
      },
      slideToUpdate
    );
  
    closeImageModal();
  };

  return (
    <>
      
    </>
  )
}