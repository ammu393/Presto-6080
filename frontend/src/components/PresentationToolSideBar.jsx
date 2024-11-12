import { useState } from "react";
import textIcon from "../assets/text.svg";
import imageIcon from "../assets/image.svg";
import codeIcon from "../assets/code_icon.svg"

import PresentationToolBarItem from "./PresentationToolBarItem";
import TextPropertiesModal from "./modals/TextPropertiesModal";
import ImagePropertiesModal from "./modals/ImagePropertiesModal";
import VideoPropertiesModal from "./modals/VideoPropertiesModal";
import videoIcon from "../assets/video.svg";
import backgroundIcon from "../assets/back.svg";
import CodePropertiesModal from "./modals/CodePropertiesModal";
import BackgroundModal from "./modals/BackgroundModal";

export default function PresentationToolSideBar({ addElementToSlide, updateBackground, displaySlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);

  const openTextModal = () => setIsTextModalOpen(true);
  const closeTextModal = () => setIsTextModalOpen(false);
  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  const openCodeModal = () => setIsCodeModalOpen(true);
  const closeCodeModal = () => setIsCodeModalOpen(false);

  const openBackgroundModal = () => setIsBackgroundModalOpen(true);
  const closeBackgroundModal = () => setIsBackgroundModalOpen(false);

  return (
    <>
      <aside
        id="default-sidebar"
        className="z-40 w-26 min-h-screen transition-transform bg-[#2f2f33] dark:bg-gray-800"
        aria-label="Tool Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <PresentationToolBarItem icon={textIcon} text="Text" onClick={openTextModal} />
            <PresentationToolBarItem icon={imageIcon} text="Image" onClick={openImageModal} />
            <PresentationToolBarItem icon={videoIcon} text="Video" onClick={openVideoModal} />
            <PresentationToolBarItem icon={codeIcon} text="Code" onClick={openCodeModal} />
            <PresentationToolBarItem icon={backgroundIcon} text="Background" onClick={openBackgroundModal} />
          </ul>
        </div>
      </aside>
      <TextPropertiesModal 
        isOpen={isTextModalOpen} 
        closeTextModal={closeTextModal} 
        addElementToSlide={addElementToSlide}
        displaySlide={displaySlide}
      />
      <ImagePropertiesModal
        isOpen={isImageModalOpen} 
        closeImageModal={closeImageModal} 
        addElementToSlide={addElementToSlide}
        displaySlide={displaySlide}
      />
      <VideoPropertiesModal
        isOpen={isVideoModalOpen} 
        closeVideoModal={closeVideoModal} 
        addElementToSlide={addElementToSlide}
        displaySlide={displaySlide}
      />
      <CodePropertiesModal 
        isOpen={isCodeModalOpen}
        closeCodeModal = {closeCodeModal}
        addElementToSlide = {addElementToSlide}
        displaySlide = {displaySlide}
      />
      <BackgroundModal 
        isOpen={isBackgroundModalOpen}
        closeBackgroundModal={closeBackgroundModal}
        updateBackground={updateBackground}
        displaySlide={displaySlide}
      />
    </>
  );
}
