import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import { putStore } from "../../api";
import { useError } from "../../contexts/useError";
import FixedLogout from "../../components/FixedLogout";
export default function Rearrange({ token, store, setStore, setToken }) {
  const navigate = useNavigate();
  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showError } = useError();

  // Gets current slides of a particular presentation, and provides indexes to all of them
  useEffect(() => {
    const fetchPresentations = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const foundPresentation = response.data.store.presentations.find(
            (p) => p.presentationId === presentationId
          );
          setPresentation(foundPresentation);
          const slidesWithOriginalIndex = foundPresentation?.slides?.map((slide, index) => ({
            ...slide,
            originalIndex: index, 
          }));
          setSlides(slidesWithOriginalIndex || []); 
        } else {
          showError("Failed to get store");
        }
      } catch {
        showError("Failed to get store");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchPresentations();
    }
  }, [token, presentationId]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  // Updates store in state variable and backend
  const updatePresentationStore = async (updatedPresentation) => {
    const currentPresentations = store.presentations || [];
    const presentationIndex = currentPresentations.findIndex(
      (presentation) => presentation.presentationId === presentationId
    );

    if (presentationIndex === -1) {
      showError("Presentation couldn't be found");
      return;
    }

    const updatedPresentations = currentPresentations.map((presentation, index) =>
      index === presentationIndex ? updatedPresentation : presentation
    );

    const newStore = { presentations: updatedPresentations };

    setStore(newStore);

    try {
      await putStore({ store: newStore }, token);
    } catch {
      showError("Failed to update store");
    }
  };

  // Updates the new postion of the slides
  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("dragIndex");
    if (dragIndex === dropIndex) return;

    const updatedSlides = [...slides];
    const [movedSlide] = updatedSlides.splice(dragIndex, 1); 
    updatedSlides.splice(dropIndex, 0, movedSlide); 

    setSlides(updatedSlides); 

    const updatedPresentation = { ...presentation, slides: updatedSlides };
    await updatePresentationStore(updatedPresentation);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <FixedLogout token={token} setToken={setToken}/>
      <button
        className="absolute top-5 right-32 px-4 py-2 ml-2 bg-red-500 text-white rounded"
        onClick={() => navigate(`/presentations/${presentationId}/1`)}
      >
        Close
      </button>
      <h1 className="text-3xl font-bold pb-10 mr-10 text-center text-[#fffff]">Rearrange Slides</h1>

      <div
        className="relative w-full max-w-lg bg-[#1f2a38] p-8 rounded-lg shadow-lg border"
        style={{ maxWidth: '900px' }}
      >        
        <h1 className="text-2xl font-bold mb-7 text-[#f2f3f5] text-center">
          {presentation.title}:
        </h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.slideId}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="w-40 h-32 bg-gray-100 flex flex-col items-center justify-center rounded border italic cursor-pointer p-2"
            >
              <span className="text-xl font-bold">{slide.originalIndex + 1}</span> {/* Display the old index */}
              <div className="mt-2 text-sm text-center">
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}