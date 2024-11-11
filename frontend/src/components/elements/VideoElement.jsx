

export default function VideoElement({element, style}) {
  return (
    <video
      src={element.url}
      autoPlay={element.autoPlay}
      controls
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  )
}