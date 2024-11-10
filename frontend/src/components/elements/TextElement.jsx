export default function TextElement({ element, style }) {
  return (
    <p style={{ fontSize: element.fontSize, color: element.color, fontFamily: element.fontFamily, ...style }}>
      {element.text}
    </p>
  );
}
  