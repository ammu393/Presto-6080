import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function CodePropertiesModal({ isOpen, closeCodeModal, addElementToSlide, deleteElementFromSlide, displaySlide, currentElement }) {
  const [codeBlock, setCodeBlock] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    if (currentElement) {
      setCodeBlock(currentElement.code || "");
      setWidth(parseFloat(currentElement.width) || 0);
      setHeight(parseFloat(currentElement.height) || 0);
      setFontSize(parseFloat(currentElement.fontSize) || 1);
      setTop(currentElement.top.replace(/%/g, "") || 0);
      setLeft(currentElement.left.replace(/%/g, "") || 0);
      
      console.log(currentElement);
    }
  }, [currentElement, displaySlide]);

  if (!isOpen) return null;

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    
    let slideToUpdate = displaySlide;
    if (currentElement) {
      slideToUpdate = await deleteElementFromSlide(currentElement.elementId);
    }
  
    addElementToSlide(
      {
        elementId: uuidv4(),
        type: "code",
        code: codeBlock,
        width: `${width}%`,
        height: `${height}%`,
        fontSize: `${fontSize}em`,
        top: `${top}%`,
        left: `${left}%`,
      },
      slideToUpdate
    );
  
    closeCodeModal();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
      <form onSubmit={handleSubmitCode} className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4">{currentElement ? "Edit Code" : "New Code"}</h2>

        <label className="block text-lg font-medium mb-2">Code Area:</label>
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

        <label className="block text-lg font-medium mb-2">Code:</label>
        <textarea
          placeholder="Enter your Code here"
          value={codeBlock}
          onChange={(e) => setCodeBlock(e.target.value)}
          className="border p-2 w-full h-80 mb-4 resize-none"
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
            onClick={closeCodeModal}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
