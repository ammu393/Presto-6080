import { useState } from "react";
import textIcon from "../assets/text.svg";
import PresentationToolBarItem from "./PresentationToolBarItem";

export default function PresentationToolSideBar({ addElementToSlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [color, setColor] = useState("#000000");

  const openTextModal = () => {
    setIsTextModalOpen(true);
  };

  const closeTextModal = () => {
    setIsTextModalOpen(false);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();

    addElementToSlide({
      text: textValue,
      width: `${width}%`,
      height: `${height}%`,
      fontSize: `${fontSize}em`,
      color: color,
      top: 0,
      left: 0,
    });

    closeTextModal();
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="z-40 w-24 min-h-screen transition-transform bg-[#2f2f33] dark:bg-gray-800"
        aria-label="Tool Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <PresentationToolBarItem icon={textIcon} text="Text" onClick={openTextModal} />
          </ul>
        </div>
      </aside>
      {isTextModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
          <form onSubmit={handleSubmitText} className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">New Text</h2>

            <label className="block text-sm font-medium mb-2">Text Area Size (%):</label>
            <div className="flex space-x-2 mb-4">
              <input
                type="number"
                placeholder="Width (%)"
                min="0"
                max="100"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="border p-2 w-1/2"
              />
              <input
                type="number"
                placeholder="Height (%)"
                min="0"
                max="100"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border p-2 w-1/2"
              />
            </div>

            <label className="block text-sm font-medium mb-2">Text:</label>
            <textarea
              placeholder="Enter your text here"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="border p-2 w-full mb-4 resize-none"
            />

            <label className="block text-sm font-medium mb-2">Font Size (in em):</label>
            <input
              type="number"
              placeholder="e.g. 1.5"
              step="0.1"
              min="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <label className="block text-sm font-medium mb-2">Text Color (HEX):</label>
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
                onClick={closeTextModal}
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
