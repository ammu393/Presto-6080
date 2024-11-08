import { useState } from "react";
import textIcon from "../assets/text.svg";
import PresentationToolBarItem from "./PresentationToolBarItem";
import InputModal from "./InputModal";

export default function PresentationToolSideBar() {
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const openTextMoal = () => {
      setIsTextModalOpen(true);
    };

    const closeTextModal = () => {
      setIsTextModalOpen(false);
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
              <PresentationToolBarItem icon={textIcon} text="Text" onClick={openTextMoal}/>
            </ul>
          </div>
        </aside>
        {isTextModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 w-screen">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">New Text</h2>
          
              <label className="block text-sm font-medium mb-2">Text Area Size (width x height) in px:</label>
              <div className="flex space-x-2 mb-4">
                <input
                  type="number"
                  placeholder="Width"
                  className="border p-2 w-1/2"
                />
                <input
                  type="number"
                  placeholder="Height"
                  className="border p-2 w-1/2"
                />
              </div>
          
              <label className="block text-sm font-medium mb-2">Text:</label>
              <textarea
                placeholder="Enter your text here"
                className="border p-2 w-full mb-4 resize-none"
              />
          
              <label className="block text-sm font-medium mb-2">Font Size (in em):</label>
              <input
                type="number"
                placeholder="e.g., 1.5"
                step="0.1"
                className="border p-2 w-full mb-4"
              />
          
              <label className="block text-sm font-medium mb-2">Text Color (HEX):</label>
              <input
                type="text"
                placeholder="#000000"
                className="border p-2 w-full mb-4"
              />
          
              <div className="flex justify-end">
                <button
                  onClick={closeTextModal}
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
            </div>
          </div>        
        )}
      </>
    )
}