import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Slide from "../../components/Slide";
import UpArrow from '../../components/UpArrow';
import DownArrow from '../../components/DownArrow';

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
          console.log("Error:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPresentations();
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

  const moveSlideUp = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);
    if (currentIndex > 0) {
      setDisplaySlide(slides[currentIndex - 1]);
      updateURL(parseInt(slideNum) - 1);
    }
  };
  
  const moveSlideDown = () => {
    const currentIndex = slides.findIndex(slide => slide.slideId === displaySlide.slideId);

    if (currentIndex < slides.length - 1) {
      setDisplaySlide(slides[currentIndex + 1]);
      updateURL(parseInt(slideNum) + 1);
    }
  };

  const updateURL = (slideNumber) => {
    const newURL = `/presentations/preview/${presentationId}/${slideNumber}`;
    navigate(newURL, { replace: true });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {displaySlide && (
        <>
          <Slide displaySlide={displaySlide} slides={slides} preview={true}/>
          <div className='h-full flex flex-col absolute bottom-0 right-0 justify-center items-center pr-1  pb-5'>
            <div className="h-8">
              {slides.length > 0 && (
                <div className="mt-5 h-8">
                  <div className={isFirstSlide ? 'invisible' : ''}>
                    <UpArrow onClick={moveSlideUp} />
                  </div>
                  <div className={isLastSlide ? 'invisible' : ''}>
                    <DownArrow onClick={moveSlideDown} />
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