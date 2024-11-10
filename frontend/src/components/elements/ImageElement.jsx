export default function ImageElement({ element, style }) {
    console.log(element);
    return (
      <img
        src={element.src}
        alt={element.alt || "Slide image"}
        style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
      />
    );
  }
  