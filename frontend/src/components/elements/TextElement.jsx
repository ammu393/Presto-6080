export default function TextElement({ element, style, preview }) {
  return (
    <p 
      style={{ fontSize: element.fontSize, color: element.color, fontFamily: element.fontFamily, ...style }}
      tabIndex={preview ? undefined : 0}
    >
      {element.text}
    </p>
  );
}
  