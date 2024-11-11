import TextElement from "./TextElement";
import ImageElement from "./ImageElement";

export default function SlideElement({ element, onDoubleClick, onContextMenu, preview }) {
  const commonStyles = {
    position: "absolute",
    top: element.top,
    left: element.left,
    width: element.width,
    height: element.height,
    cursor: preview ? "auto" : "pointer",
    border: preview ? "none" : "1px solid #d3d3d3",
    overflow: "hidden",
  };

  const renderElement = () => {
    switch (element.type) {
    case "text":
      return <TextElement element={element} style={commonStyles} preview={preview} />;
    case "image":
      return <ImageElement element={element} style={commonStyles} preview={preview} />;
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
    >
      {renderElement()}
    </div>
  );
}
