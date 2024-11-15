import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function VideoPropertiesModal({ isOpen, closeVideoModal, addElementToSlide, deleteElementFromSlide, displaySlide, currentElement }) {
  const [url, setUrl] = useState("");
  const [autoplay, setAutoplay] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  // Sets states with current values or with default values
  useEffect(() => {
    if (currentElement) {
      setUrl(currentElement.url || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setUrl(currentElement.url || "");
      setAutoplay(currentElement.autoplay || false);
      setTop(parseFloat(currentElement.top.replace(/%/g, "")) || 0);
      setLeft(parseFloat(currentElement.left.replace(/%/g, "")) || 0);
    }
  }, [currentElement, displaySlide]);

  if (!isOpen) return null;

  // Adds video to the slide closes modal
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    let slideToUpdate = displaySlide
    if (currentElement) {
      slideToUpdate = await deleteElementFromSlide(currentElement.elementId);
    }

    addElementToSlide( 
      {
        elementId:uuidv4(),
        type:"video",
        url: url,
        autoplay: autoplay,
        width: `${width}%`,
        height: `${height}%`,
        top: `${top}%`,
        left: `${left}%`,
      },
      slideToUpdate
    );

    closeVideoModal();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
        <form 
          onSubmit={handleSubmitVideo}
          className="bg-white rounded-lg p-6 max-w-md sm:w-2/3 lg:w-1/3"
          aria-label="Video properties modal"
          aria-modal="true"
        >
          <h2 className="text-xl font-bold mb-4">{currentElement ? "Edit Video" : "New Video"}</h2>

          <label className="block text-lg font-medium mb-2">Size:</label>
          {!currentElement && (            
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
          )}
          <label className="block text-lg font-medium">Video URL</label>
          <input
            placeholder="Enter URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <div className="flex items-center">
            <input 
              type="checkbox" 
              value="" 
              className="w-4 h-4 mb-2 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
            />
            <label className="ms-2 mb-2 ml-2 text-sm font-medium italic">Auto-play video?</label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeVideoModal}
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