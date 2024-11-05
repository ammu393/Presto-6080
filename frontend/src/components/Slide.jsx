


export default function Slide(displaySlide) {
  return (
    <div className="bg-white w-[800px] h-[600px] flex items-center border-4 border-[#cbd5e1] border-dashed justify-center p-4 m-10 ">
      <p className="text-gray-800">{displaySlide.displaySlide.slideId}</p>
    </div>
  );
}