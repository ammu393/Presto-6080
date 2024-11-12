export default function TextElement({ element, style, preview, displaySlide }) {
  return (
    <p 
      style={{ fontSize: element.fontSize, color: element.color, fontFamily: displaySlide.fontFamily, ...style }}
    >
      {element.text}
    </p>
  );
}
  