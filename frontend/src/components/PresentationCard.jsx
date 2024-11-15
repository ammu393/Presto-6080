import { useNavigate } from "react-router-dom";

export function PresentationCard({ title, description, numSlides, presentationId, thumbnail }) {
  const navigate = useNavigate();

  // Navigates to a partcular presentation page
  const goToPresentationPage = () => {
    navigate(`/presentations/${presentationId}/1`);
  }

  return (
    <div 
      className="
      bg-white aspect-[2/1] w-min-[100px] max-w-lg flex flex-col p-4 cursor-pointer 
      border border-transparent hover:border-gray-400 transition-all duration-300
    "      
      tabIndex="0"
      role="group"
      aria-label="Presentation Card"
      onClick={goToPresentationPage}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          goToPresentationPage();
        }
      }}
    >
      <div className="w-full h-3/4 bg-gray-300 mb-2 flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={`${title} Thumbnail`} 
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-sm text-gray-500">No Thumbnail</span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-1">{description}</p>
      )}
      <span className="text-xs text-gray-500">Number of Slides: {numSlides}</span>
    </div>
  );
}
