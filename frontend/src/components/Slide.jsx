export default function Slide(displaySlide) {

  console.log(displaySlide.displaySlide)
  console.log(displaySlide.slides)
  const slideNum = displaySlide.slides.findIndex(slide => slide.slideId === displaySlide.displaySlide.slideId)
  return (
    <div className="bg-white max-w-[70vw] h-[80vh] max-h-[80vh] flex border-4 border-[#cbd5e1] border-dashed p-2 m-4 sm:m-10">
      <p className="text-gray-800 justify-center">{displaySlide.displaySlide.slideId}</p>
      <div
        className=" absolute bottom-11 left-15 text-[#1f2a38] text-sm w-[10vw] h-[10vw] max-w-[50px] max-h-[50px] flex justify-center items-center text-base" 
      >
        {slideNum + 1}
      </div>
    </div>
  );
}