import { useState } from "react";
import textIcon from "../assets/text.svg";
import PresentationToolBarItem from "./PresentationToolBarItem";
import TextPropertiesModal from "./TextPropertiesModal";

export default function PresentationToolSideBar({ addElementToSlide, displaySlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const openTextModal = () => setIsTextModalOpen(true);
  const closeTextModal = () => setIsTextModalOpen(false);

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
      <TextPropertiesModal 
        isOpen={isTextModalOpen} 
        closeTextModal={closeTextModal} 
        addElementToSlide={addElementToSlide}
        displaySlide={displaySlide}
      />
    </>
  );
}
