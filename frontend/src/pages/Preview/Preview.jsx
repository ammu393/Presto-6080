import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slide from "../../components/Slide";
import UpArrow from '../../components/UpArrow';
import DownArrow from '../../components/DownArrow';
import { useError } from "../../contexts/ErrorContext";

export default function Preview({ token }) {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displaySlide, setDisplaySlide] = useState(null);
  const [slides, setSlides] = useState(null);
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(true);
  const { slideNum } = useParams();
  const navigate = useNavigate();
  const { showError } = useError();

  // Gets the current presentation info
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
        } else {
          showError("Failed to get store");
        }
      } catch (error) {
        showError("Failed to get store");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPresentations();
    }
  }, [token, presentationId]);

  useEffect(() => {
    if (presentation && presentation.slides) {
      setSlides(presentation.slides);
      setDisplaySlide(presentation.slides[slideNum - 1]);
    }
  }, [presentation]);

  useEffect(() => {
    if (presentation && slides.length) {
      const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
      setIsFirstSlide(currentIndex === 0);
      setIsLastSlide(currentIndex === slides.length - 1);
    }

  }, [displaySlide, slides]);

  // Move current slide to the right
  const moveSlideRight = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
    if (currentIndex > 0) {
      setDisplaySlide(slides[currentIndex - 1]);
      updateURL(parseInt(slideNum) - 1);
    }
  };
  
  // Move current slide to the left
  const moveSlideLeft = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);

    if (currentIndex < slides.length - 1) {
      setDisplaySlide(slides[currentIndex + 1]);
      updateURL(parseInt(slideNum) + 1);
    }
  };

  // Updates the url to reflect the current slide number
  const updateURL = (slideNumber) => {
    const newURL = `/presentations/preview/${presentationId}/${slideNumber}`;
    navigate(newURL, { replace: true });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {displaySlide && presentation && (
        <>
          <Slide displaySlide={displaySlide} slides={slides} preview={true} presentation={presentation}/>
          <div className='h-full flex flex-col absolute bottom-0 right-0 justify-top items-center pr-1  pb-5 pt-5'>
            <div className="h-8">
              {slides.length > 0 && (
                <div className="h-5 mb-2 flex flex-row ml-auto">
                  <div className={isFirstSlide ? 'invisible' : ''}>
                    <UpArrow onClick={moveSlideRight} />
                  </div>
                  <div className={isLastSlide ? 'invisible' : ''}>
                    <DownArrow onClick={moveSlideLeft} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}