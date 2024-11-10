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
  const [fontFamily, setFontFamily] = useState("Arial"); // New font family state

  useEffect(() => {
    if (currentElement) {
      setTextValue(currentElement.text || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setFontSize(parseFloat(currentElement.fontSize) || 1);
      setColor(currentElement.color || "#000000");
      setTop(currentElement.top.replace(/%/g, "") || 0);
      setLeft(currentElement.left.replace(/%/g, "") || 0);
      setFontFamily(currentElement.fontFamily || "Arial"); // Load font family if present
      
      console.log(currentElement);
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
        fontFamily: fontFamily, // Save font family to the element
      },
      slideToUpdate
    );
  
    closeTextModal();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form onSubmit={handleSubmitText} className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">{currentElement ? "Edit Text" : "New Text"}</h2>

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

        <label className="block text-lg font-medium mb-2">Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>

        {currentElement && (
          <>
            <label className="block text-lg font-medium mb-2">Position:</label>
            <div className="flex space-x-2 mb-4">
              <label className="flex-1">
                Top (%):
                <input
                  type="number"
                  placeholder="Top (%)"
                  value={top}
                  onChange={(e) => setTop(parseFloat(e.target.value))}
                  className="border p-2 w-full"
                />
              </label>
              <label className="flex-1">
                Left (%):
                <input
                  type="number"
                  placeholder="Left (%)"
                  value={left}
                  onChange={(e) => setLeft(parseFloat(e.target.value))}
                  className="border p-2 w-full"
                />
              </label>
            </div>
          </>
        )}

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
