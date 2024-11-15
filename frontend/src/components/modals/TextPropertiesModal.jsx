import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TextPropertiesModal({ isOpen, closeTextModal, addElementToSlide, deleteElementFromSlide, displaySlide, currentElement }) {
  const [textValue, setTextValue] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [color, setColor] = useState("#000000");
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (currentElement) {
      setTextValue(currentElement.text || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setFontSize(parseFloat(currentElement.fontSize) || 1);
      setColor(currentElement.color || "#000000");
      setTop(currentElement.top.replace(/%/g, "") || 0);
      setLeft(currentElement.left.replace(/%/g, "") || 0);
    }
  }, [currentElement, displaySlide]);

  if (!isOpen) return null;

  const handleSubmitText = async (e) => {
    e.preventDefault();
    
    let slideToUpdate = displaySlide;
    if (currentElement) {
      slideToUpdate = await deleteElementFromSlide(currentElement.elementId);
    }
  
    addElementToSlide(
      {
        elementId: uuidv4(),
        type: "text",
        text: textValue,
        width: `${width}%`,
        height: `${height}%`,
        fontSize: `${fontSize}em`,
        color: color,
        top: `${top}%`,
        left: `${left}%`,
      },
      slideToUpdate
    );
  
    closeTextModal();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form
        onSubmit={handleSubmitText}
        className="bg-white rounded-lg p-6 max-w-md sm:w-2/3 lg:w-1/3"
        aria-label="Text properties modal"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-4">{currentElement ? "Edit Text" : "New Text"}</h2>

        {!currentElement && (
          <>
            <label className="block text-lg font-medium mb-2">Text Area:</label>
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
          </>
        )}
        <label className="block text-lg font-medium mb-2">Text:</label>
        <textarea
          placeholder="Enter your text here"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="border p-2 w-full mb-4 resize-none"
        />

        <label className="block text-lg font-medium mb-2">Font Size (in em):</label>
        <input
          type="number"
          placeholder="e.g. 1.5"
          step="0.1"
          min="0.1"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <label className="block text-lg font-medium mb-2">Text Color (HEX):</label>
        <input
          type="text"
          placeholder="#000000"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 w-full mb-4"
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
            onClick={closeTextModal}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
