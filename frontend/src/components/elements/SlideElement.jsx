import { useState } from "react";
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
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [initialTop, setInitialTop] = useState(element.top);
  const [initialLeft, setInitialLeft] = useState(element.left);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialX(e.clientX);
    setInitialY(e.clientY);
    setInitialTop(parseFloat(element.top));
    setInitialLeft(parseFloat(element.left));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;

    const newTop = Math.max(0, Math.min(initialTop + (deltaY / e.currentTarget.parentElement.offsetHeight) * 100, 100 - parseFloat(element.height))); 
    const newLeft = Math.max(0, Math.min(initialLeft + (deltaX / e.currentTarget.parentElement.offsetWidth) * 100, 100 - parseFloat(element.width)));
    updateElementPosition({ ...element, top: `${newTop}%`, left: `${newLeft}%` });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const commonStyles = {
    position: "absolute",
    top: element.top,
    left: element.left,
    width: element.width,
    height: element.height,
    cursor: "move",
    overflow: "hidden",
  };

  const renderElement = () => {
    switch (element.type) {
      case "text":
        return <TextElement element={element} style={commonStyles} />;
      case "image":
        return <ImageElement element={element} style={commonStyles} />;
      case "video":
        return <VideoElement element={element} style={commonStyles} />;
      case "code":
        return <CodeElement element={element} style={commonStyles} />;
      default:
        return null;
    }
  };

  const renderCorners = () => {
    return (
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-slate-400"></div>
        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-slate-400"></div>
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-slate-400"></div>
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-slate-400"></div>
      </div>
    );
  };

  return (
    <div
      style={commonStyles}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDoubleClick={() => onDoubleClick(element)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(element);
      }}
      onClick={() => onSingleClick(element)}
      tabIndex={0}

    >
      {renderElement()}
      
      {selected && renderCorners()} {/* Show corners only if selected */}
    </div>
  );
}