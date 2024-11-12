export default function VideoElement({element, style}) {
  const videoSrc = element.autoplay ? `${element.url}&autoplay=1` : element.url;
  return (
    <iframe
      src={videoSrc}
      allowFullScreen
      allow="autoplay; encrypted-media"
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  )
}