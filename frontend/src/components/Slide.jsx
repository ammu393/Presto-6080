import { useState } from "react";
import TextPropertiesModal from "./TextPropertiesModal";

export default function Slide({ displaySlide, slides, addElementToSlide, deleteElementFromSlide }) {
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [elementId, setElementId] = useState("");

  const openTextModal = (id) => {
    setIsTextModalOpen(true);
    setElementId(id);
  };
  const closeTextModal = () => {
    setIsTextModalOpen(false);
    setElementId("");
  }

  const slideContent = displaySlide?.elements || [];
  const slideNum = slides.findIndex(slide => slide.slideId === displaySlide.slideId) + 1;
  console.log(displaySlide)

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
              }}
              onDoubleClick={() => openTextModal(element.elementId)}
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
        elementId={elementId}
        deleteElementFromSlide={deleteElementFromSlide}
      />
    </>
  );
}
