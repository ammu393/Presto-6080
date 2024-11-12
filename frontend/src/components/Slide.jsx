import { useEffect, useState } from "react";
import TextPropertiesModal from "./modals/TextPropertiesModal";
import { ConfirmationModal } from "./modals/ConfirmationModal";
import SlideElement from "./elements/SlideElement";
import ImagePropertiesModal from "./modals/ImagePropertiesModal";
import CodePropertiesModal from "./modals/CodePropertiesModal";
import VideoPropertiesModal from "./modals/VideoPropertiesModal";

export default function Slide({
  displaySlide,
  slides,
  addElementToSlide,
  deleteElementFromSlide,
  preview,
  presentation,
}) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState({});
  const [slideWidth, setSlideWidth] = useState("70vw");
  const [slideHeight, setSlideHeight] = useState("80vh");
  const [selectedElement, setSelectedElement] = useState(null); // Track selected element
  const [clicked, setClicked] = useState(false); // Track selected element
  const [finalBackground, setFinalBackground] = useState({});

  useEffect(() => {
    if (preview) {
      setSlideHeight("100vh");
      setSlideWidth("100vw");
    } else {
      setSlideHeight("80vh");
      setSlideWidth("70vw");
    }
  }, [preview]);

  useEffect(() => {
    console.log("display slide: ", displaySlide, "presentation: ", presentation);
    const finalStyle = displaySlide.backgroundStyle.type || presentation.backgroundStyle.type;
    const finalColour1 = displaySlide.backgroundStyle.firstColour || presentation.backgroundStyle.firstColour;
    const finalColour2 = displaySlide.backgroundStyle.secondColour || presentation.backgroundStyle.secondColour;
    const finalGradientDirection = displaySlide.backgroundStyle.gradientDirection || presentation.backgroundStyle.gradientDirection;
    const finalSrc = displaySlide.backgroundStyle.src || presentation.backgroundStyle.src;

    setFinalBackground(
      {
        type: finalStyle,
        firstColour: finalColour1,
        secondColour: finalColour2,
        gradientDirection: finalGradientDirection,
        src: finalSrc,
      }
    )
    console.log("in slide.jsx heres the final background: ", {
      type: finalStyle,
      firstColour: finalColour1,
      secondColour: finalColour2,
      gradientDirection: finalGradientDirection,
      src: finalSrc,
    })
  }, [displaySlide]);

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

  const openCodeModal = (element) => {
    setIsCodeModalOpen(true);
    setCurrentElement(element);
  };

  const closeCodeModal = () => {
    setIsCodeModalOpen(false);
    setCurrentElement({});
  };

  const openVideoModal = (element) => {
    setIsVideoModalOpen(true);
    setCurrentElement(element);
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentElement({});
  }


  const openDeleteModal = (element) => {
    if (!preview) {
      setIsDeleteModalOpen(true);
      setCurrentElement(element);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentElement({});
  };

  const slideContent = displaySlide?.elements || [];
  const slideNum = slides.findIndex(slide => slide.slideId === displaySlide.slideId) + 1;
  
  const handleSingleClick = (element) => {
    if (!clicked) {
      setClicked(true)
      setSelectedElement(element); // Set the selected element
      console.log(element)
    } else {
      setSelectedElement(null); // Deselect element if clicked again
      setClicked(false);
    }
  };



  const handleDeleteElement = (elementToDelete) => {
    deleteElementFromSlide(elementToDelete.elementId);
    closeDeleteModal();
  };

  const handleDoubleClick = (element) => {
    if (element.type === "text") {
      openTextModal(element);
    } else if (element.type === "image") {
      openImageModal(element);
    } else if (element.type === "code") {
      openCodeModal(element);
    } else if (element.type == 'video') {
      openVideoModal(element);

    }
  };

  const getBackgroundStyle = () => {
    if (finalBackground.type === "solid") {
      return { backgroundColor: finalBackground.firstColour };
    } else if (finalBackground.type === "gradient" && finalBackground.secondColour) {
      return {
        background: `linear-gradient(${finalBackground.gradientDirection || "to right"}, ${finalBackground.firstColour}, ${finalBackground.secondColour})`
      };
    } else if (finalBackground.type === "image" && finalBackground.src) {
      return {
        backgroundImage: `url(${finalBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  };

  const updateElementPosition = (updatedElement) => {
    // Update the element's position
    const elementExistsInCurrentSlide = displaySlide.elements.some(
      (element) => element.elementId === updatedElement.elementId
    );
  
    if (elementExistsInCurrentSlide) {
      console.log("Updating position for element", updatedElement);
      addElementToSlide(updatedElement, displaySlide); // Update the slide with the new element position
    } else {
      console.log("Attempted to update position of element not in this slide");
    }
  };



  return (
    <>
      <div
        className={`flex items-center justify-center p-4 relative ${
          preview ? "" : "border-4 border-[#cbd5e1] border-dashed m-4 sm:m-10"
        }`}
        style={{
          width: slideWidth,
          height: slideHeight,
          ...getBackgroundStyle(),
        }}
      >
        {slideContent.length > 0 &&
          slideContent.map((element, index) => (
            <SlideElement
              key={index}
              element={element}
              selected={selectedElement?.elementId === element.elementId}
              onDoubleClick={() => handleDoubleClick(element)}
              onContextMenu={() => openDeleteModal(element)}
              onSingleClick={() => handleSingleClick(element)}
              updateElementPosition={updateElementPosition}
              preview={preview}
              displaySlide={displaySlide}
            />
          ))}
        {/* Slide number */}
        <div
          className="absolute bottom-0 left-0 text-[#1f2a38] text-sm w-[10vw] h-[10vw] max-w-[50px] max-h-[50px] flex justify-center items-center text-base"
        >
          {slideNum}
        </div>
      </div>
      {isTextModalOpen && (
        <TextPropertiesModal
          isOpen={isTextModalOpen}
          closeTextModal={closeTextModal}
          addElementToSlide={addElementToSlide}
          deleteElementFromSlide={deleteElementFromSlide}
          displaySlide={displaySlide}
          currentElement={currentElement}
        />
      )}

      {isImageModalOpen && (
        <ImagePropertiesModal
          isOpen={isImageModalOpen}
          closeImageModal={closeImageModal}
          addElementToSlide={addElementToSlide}
          deleteElementFromSlide={deleteElementFromSlide}
          displaySlide={displaySlide}
          currentElement={currentElement}
        />
      )}
      {isCodeModalOpen && (
        <CodePropertiesModal
          isOpen={isCodeModalOpen}
          closeCodeModal={closeCodeModal}
          addElementToSlide={addElementToSlide}
          deleteElementFromSlide={deleteElementFromSlide}
          displaySlide={displaySlide}
          currentElement={currentElement}
        />
      )}

      {isVideoModalOpen && (
        <VideoPropertiesModal
        isOpen={isVideoModalOpen}
        closeVideoModal={closeVideoModal}
        addElementToSlide={addElementToSlide}
        deleteElementFromSlide={deleteElementFromSlide}
        displaySlide={displaySlide}
        currentElement={currentElement}
        />
      )}
      
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
