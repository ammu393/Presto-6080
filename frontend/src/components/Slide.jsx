


export default function Slide(displaySlide) {

  
  return (
    <div className="bg-white max-w-[70vw] h-[80vh] max-h-[80vh] flex items-center border-4 border-[#cbd5e1] border-dashed justify-center p-4 m-4 sm:m-10">
      <p className="text-gray-800">{displaySlide.displaySlide.slideId}</p>
    </div>
  );
}