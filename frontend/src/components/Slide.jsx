import { useState } from "react";
import TextPropertiesModal from "./TextPropertiesModal";
import { ConfirmationModal } from "./ConfirmationModal";
import SlideElement from "./elements/SlideElement";
import ImagePropertiesModal from "./ImagePropertiesModal";

export default function Slide({ displaySlide, slides, addElementToSlide, deleteElementFromSlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState({});

  const openTextModal = (element) => {
    setIsTextModalOpen(true);
    setCurrentElement(element);
  };
  
  const closeTextModal = () => {
    setIsTextModalOpen(false);
    setCurrentElement({});
  };

  const openImageModal = (element) => {
    setIsImageModalOpen(true);
    setCurrentElement(element);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setCurrentElement({});
  };

  const openDeleteModal = (element) => {
    setIsDeleteModalOpen(true);
    setCurrentElement(element);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentElement({});
  };

  const slideContent = displaySlide?.elements || [];
  const slideNum = slides.findIndex(slide => slide.slideId === displaySlide.slideId) + 1;

  const handleDeleteElement = (elementToDelete) => {
    deleteElementFromSlide(elementToDelete.elementId);
    closeDeleteModal();
  };

  const handleDoubleClick = (element) => {
    console.log("here")
    if (element.type === "text") {
      openTextModal(element);
    } else if (element.type === "image") {
      console.log("hereeeee")
      openImageModal(element);
    }
  };

  return (
    <>
      <div className="bg-white max-w-[70vw] h-[80vh] max-h-[80vh] flex items-center border-4 border-[#cbd5e1] border-dashed justify-center p-4 m-4 sm:m-10 relative">
        {slideContent.length > 0 && slideContent.map((element, index) => (
          <SlideElement
            key={index}
            element={element}
            onDoubleClick={() => handleDoubleClick(element)}
            onContextMenu={() => openDeleteModal(element)}
          />
        ))}
        <div
          className="absolute bottom-0 left-0 text-[#1f2a38] text-sm w-[10vw] h-[10vw] max-w-[50px] max-h-[50px] flex justify-center items-center text-base"
        >
          {slideNum}
        </div>
      </div>

      <TextPropertiesModal
        isOpen={isTextModalOpen}
        closeTextModal={closeTextModal}
        addElementToSlide={addElementToSlide}
        deleteElementFromSlide={deleteElementFromSlide}
        displaySlide={displaySlide}
        currentElement={currentElement}
      />

      {isImageModalOpen && <ImagePropertiesModal
        isOpen={isImageModalOpen}
        closeImageModal={closeImageModal}
        addElementToSlide={addElementToSlide}
        deleteElementFromSlide={deleteElementFromSlide}
        displaySlide={displaySlide}
        currentElement={currentElement}
      />}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDeleteElement(currentElement)}
        title="Are you sure?"
        text="Do you really want to permanently delete this element?"
      />
    </>
  );
}
