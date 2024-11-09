import { useState } from "react";
import TextPropertiesModal from "./TextPropertiesModal";
import { ConfirmationModal } from "./ConfirmationModal";

export default function Slide({ displaySlide, slides, addElementToSlide, deleteElementFromSlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState({})

  const openTextModal = (element) => {
    setIsTextModalOpen(true);
    setCurrentElement(element)
  };
  const closeTextModal = () => {
    setIsTextModalOpen(false);
    setCurrentElement({})
  }

  const openDeleteModal = (element) => {
    setIsDeleteModalOpen(true);
    setCurrentElement(element);
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentElement({});
  }

  const slideContent = displaySlide?.elements || [];
  const slideNum = slides.findIndex(slide => slide.slideId === displaySlide.slideId) + 1;
  console.log(displaySlide)

  const handleDeleteElement = (elementToDelete) => {
    deleteElementFromSlide(elementToDelete.elementId);
    closeDeleteModal();
  };

  return (
    <>
      <div className="bg-white max-w-[70vw] h-[80vh] max-h-[80vh] flex items-center border-4 border-[#cbd5e1] border-dashed justify-center p-4 m-4 sm:m-10 relative">
        {slideContent.length > 0 && (
          slideContent.map((element, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: element.top,
                left: element.left,
                width: element.width,
                height: element.height,
                fontSize: element.fontSize,
                color: element.color,
                border: "1px solid #d3d3d3",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onDoubleClick={() => openTextModal(element)}
              onContextMenu={(e) => {
                e.preventDefault();
                openDeleteModal(element);
              }}
              tabIndex={0}
            >
              <p>{element.text}</p>
            </div>
          ))
        )}
        <div
          className=" absolute bottom-0 left-0 text-[#1f2a38] text-sm w-[10vw] h-[10vw] max-w-[50px] max-h-[50px] flex justify-center items-center text-base" 
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
