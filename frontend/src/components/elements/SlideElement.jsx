import TextElement from "./TextElement";
import ImageElement from "./ImageElement";
import VideoElement from "./VideoElement";
export default function SlideElement({ element, onDoubleClick, onContextMenu, preview }) {
  const commonStyles = {
    position: "absolute",
    top: element.top,
    left: element.left,
    width: element.width,
    height: element.height,
    cursor: "pointer",
    border: "1px solid #d3d3d3",
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
    default:
      return null;
    }
  };

  return (
    <div
      onDoubleClick={() => onDoubleClick(element)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(element);
      }}
      tabIndex={0}
    >
      {renderElement()}
    </div>
  );
}
