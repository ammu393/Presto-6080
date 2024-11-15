export default function TextElement({ element, style, displaySlide }) {
  return (
    <p 
      style={{ fontSize: element.fontSize, color: element.color, fontFamily: displaySlide.fontFamily, ...style }}
    >
      {element.text}
    </p>
  );
}
  