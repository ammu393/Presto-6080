import { useState } from "react";
import textIcon from "../assets/text.svg";
import imageIcon from "../assets/image.svg";
import PresentationToolBarItem from "./PresentationToolBarItem";
import TextPropertiesModal from "./TextPropertiesModal";
import ImagePropertiesModal from "./ImagePropertiesModal";
import videoIcon from "../assets/video.svg";
// import VideoPropertiesModal from "./VideoPropertiesModal";

export default function PresentationToolSideBar({ addElementToSlide, displaySlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openTextModal = () => setIsTextModalOpen(true);
  const closeTextModal = () => setIsTextModalOpen(false);
  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

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
            <PresentationToolBarItem icon={imageIcon} text="Image" onClick={openImageModal} />
            <PresentationToolBarItem icon={videoIcon} text="Video" onClick={openVideoModal} />

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
    </>
  );
}
