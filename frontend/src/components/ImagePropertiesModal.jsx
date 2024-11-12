import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ImagePropertiesModal({ isOpen, closeImageModal, addElementToSlide, deleteElementFromSlide, displaySlide, currentElement }) {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (currentElement) {
      setSrc(currentElement.src || "");
      setAlt(currentElement.alt || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setTop(parseFloat(currentElement.top.replace(/%/g, "")) || 0);
      setLeft(parseFloat(currentElement.left.replace(/%/g, "")) || 0);
    }
  }, [currentElement, displaySlide]);

  if (!isOpen) return null;

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
        src: src,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
        <form onSubmit={handleSubmitImage} className="bg-white rounded-lg p-6 w-1/3">
          <h2 className="text-xl font-bold mb-4">{currentElement ? "Edit Image" : "New Image"}</h2>

          <label className="block text-lg font-medium mb-2">Size:</label>
          <div className="flex space-x-2 mb-4">
            <label className="flex-1">
              Width (%):
              <input
                type="number"
                placeholder="Width (%)"
                min="0"
                max="100"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <label className="flex-1">
              Height (%):
              <input
                type="number"
                placeholder="Height (%)"
                min="0"
                max="100"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
          </div>

          <label className="block text-lg font-medium mb-2">Image URL</label>
          <input
            placeholder="Enter URL here"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block text-lg font-medium mb-2">Alt Tag Description:</label>
          <textarea
            placeholder="Description"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="border p-2 w-full mb-4 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeImageModal}
              className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}