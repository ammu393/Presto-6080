export default function TextElement({ element, style }) {
    return (
      <p style={{ fontSize: element.fontSize, color: element.color, ...style }}>
        {element.text}
      </p>
    );
  }
  