export default function TextElement({ element, style, preview, displaySlide }) {
  return (
    <p 
      style={{ fontSize: element.fontSize, color: element.color, fontFamily: displaySlide.fontFamily, ...style }}
      tabIndex={preview ? undefined : 0}
    >
      {element.text}
    </p>
  );
}
  