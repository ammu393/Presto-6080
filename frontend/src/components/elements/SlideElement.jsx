import { useState, useEffect } from "react";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";
import VideoElement from "./VideoElement";
import CodeElement from "./CodeElement";

export default function SlideElement({
  element,
  onDoubleClick,
  onContextMenu,
  onSingleClick,
  updateElementPosition,
  selected,
  displaySlide,
  preview,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [initialTop, setInitialTop] = useState(0);
  const [initialLeft, setInitialLeft] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);

  const [localElement, setLocalElement] = useState(element);

  useEffect(() => {
    setLocalElement(element);
  }, [element]);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("resize-handle")) {
      setIsResizing(true);
      setResizeDirection(e.target.dataset.direction);
    } else {
      setIsDragging(true);
    }

    setInitialX(e.clientX);
    setInitialY(e.clientY);
    setInitialTop(parseFloat(localElement.top));
    setInitialLeft(parseFloat(localElement.left));
    setInitialWidth(parseFloat(localElement.width));
    setInitialHeight(parseFloat(localElement.height));
  };
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };


  const throttledMouseMove = throttle((e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      const newTop = Math.max(0, Math.min(initialTop + (deltaY / e.currentTarget.parentElement.offsetHeight) * 100, 100 - parseFloat(localElement.height)));
      const newLeft = Math.max(0, Math.min(initialLeft + (deltaX / e.currentTarget.parentElement.offsetWidth) * 100, 100 - parseFloat(localElement.width)));

      const updatedElement = { ...localElement, top: `${newTop}%`, left: `${newLeft}%` };
      setLocalElement(updatedElement);
      updateElementPosition(updatedElement);
    }

    if (isResizing) {
      const parent = e.currentTarget.parentElement;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      let newWidth = initialWidth;
      let newHeight = initialHeight;
      let newTop = initialTop;
      let newLeft = initialLeft;

      if (resizeDirection.includes("right")) {
        newWidth = Math.max(1, Math.min(100, initialWidth + ((e.clientX - initialX) / parentWidth) * 100));
      }
      if (resizeDirection.includes("left")) {
        const deltaX = initialX - e.clientX;
        newWidth = Math.max(1, Math.min(100, initialWidth + (deltaX / parentWidth) * 100));
        newLeft = Math.max(0, Math.min(100 - newWidth, initialLeft - (deltaX / parentWidth) * 100));
      }
      if (resizeDirection.includes("bottom")) {
        newHeight = Math.max(1, Math.min(100, initialHeight + ((e.clientY - initialY) / parentHeight) * 100));
      }
      if (resizeDirection.includes("top")) {
        const deltaY = initialY - e.clientY;
        newHeight = Math.max(1, Math.min(100, initialHeight + (deltaY / parentHeight) * 100));
        newTop = Math.max(0, Math.min(100 - newHeight, initialTop - (deltaY / parentHeight) * 100));
      }

      const updatedElement = {
        ...localElement,
        width: `${newWidth}%`,
        height: `${newHeight}%`,
        top: `${newTop}%`,
        left: `${newLeft}%`,
      };

      setLocalElement(updatedElement);
      updateElementPosition(updatedElement);
    }
  },16);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  };

  const commonStyles = {
    position: "absolute",
    top: localElement.top,
    left: localElement.left,
    width: localElement.width,
    height: localElement.height,
    cursor: isDragging ? "grabbing" : "move",
    padding: 0,
    margin: 0,
    overflow: "hidden",  // Hide excess with an option to control it
   
  };

  const renderElement = () => {
    switch (localElement.type) {
    case "text":
      return <TextElement element={localElement} style={commonStyles} displaySlide={displaySlide}/>;
    case "image":
      return <ImageElement element={localElement} style={commonStyles} />;
    case "video":
      return <VideoElement element={localElement} style={commonStyles} />;
    case "code":
      return <CodeElement element={localElement} style={commonStyles} />;
    default:
      return null;
    }
  };

  const renderCorners = () => {
    const corners = [
      { direction: "top-left", style: "top-0 left-0" },
      { direction: "top-right", style: "top-0 right-0" },
      { direction: "bottom-left", style: "bottom-0 left-0" },
      { direction: "bottom-right", style: "bottom-0 right-0" },
    ];

    return corners.map(({ direction, style }) => (
      <div
        key={direction}
        data-direction={direction}
        className={`resize-handle absolute w-2 h-2 bg-blue-500 ${style} cursor-se-resize`}
      ></div>
    ));
  };
  return (
    <div
      style={commonStyles}
      onMouseDown={handleMouseDown}
      onMouseMove={throttledMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={() => onDoubleClick(localElement)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(localElement);
      }}
      onClick={() => onSingleClick(localElement)}
      tabIndex={preview ? undefined : 0}
    >
      {renderElement()}
      {selected && renderCorners()}
    </div>
  );
}