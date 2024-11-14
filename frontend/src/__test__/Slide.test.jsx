import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Slide  from '../components/Slide';
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('./elements/SlideElement', () => ({ 
  __esModule: true, 
  default: vi.fn(() => <div data-testid="slide-element" />) 
}));

vi.mock('./modals/TextPropertiesModal', () => ({ 
  __esModule: true, 
  default: vi.fn(() => <div>Text Properties Modal</div>) 
}));

vi.mock('./modals/ConfirmationModal', () => ({ 
  __esModule: true, 
  default: vi.fn(() => <div>Confirmation Modal</div>) 
}));
const url = "https://www.youtube.com/embed/dQw4w9WgXcQ?si=ZVLBiX_k2dqcfdBt"

    const mockDisplaySlide = {
      slideId:'1',
      elements:[
        {
          elementId: '12',
          type: 'text',
          text: "hello",
          width: "20%",
          height: "20%",
          fontSize: "1em",
          color: "#000000",
          top: "0%",
          left: "0%"
        },
        {
          elementId: '13',
          type: 'video',
          url: url,
          autoplay: false,
          width: "20%",
          height: "20%",
          top: "0%",
          left: "0%"
        },
        {
          elementId: '14',
          type: 'image',
          src: 'img.svg',
          alt: 'image_1',
          width: "20%",
          height: "20%",
          top: "0%",
          left: "0%"
        },
      ],
      backgroundStyle: {
        type:null,
        firstColour:null,
        secondColour:null,
        gradientDirection:null,
        src:null
      }
    }

const mockSlides = [
  {
    mockDisplaySlide,
  },
  {
    slideId:'2',
    elements:[],
    backgroundStyle: {
      type:null,
      firstColour:null,
      secondColour:null,
      gradientDirection:null,
      src:null
    }
  }
]
const mockPresentation = {
  presentationId: '1',
  thumbnail: "",
  title: "pres1",
  description: "",
  slides: mockSlides,
  backgroundStyle: {
    type: "solid",
    firstColour: "white",
    secondColour: null,
    gradientDirection: null,
    src: null
  }
}

describe('Slide component', () => {
  const mockAddElementToSlide = vi.fn();
  const mockDeleteElementFromSlide = vi.fn();
  it('displays slide and renders text element', () => {

    render(
      <Slide 
        displaySlide={mockDisplaySlide} 
        slides={mockSlides} 
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        preview={false} 
        presentation={mockPresentation}
      />
    );
    screen.logTestingPlaygroundURL();

    expect(screen.getByText('hello')).toBeInTheDocument();
  });


  it('displays slide and renders VIDEO element', () => {

    render(
      <Slide 
        displaySlide={mockDisplaySlide} 
        slides={mockSlides} 
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        preview={false} 
        presentation={mockPresentation}
      />
    );
    expect(screen.getByRole('video', { name: /video - 13/i })).toBeInTheDocument();
  });
  it('displays slide and renders image element', () => {

    render(
      <Slide 
        displaySlide={mockDisplaySlide} 
        slides={mockSlides} 
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        preview={false} 
        presentation={mockPresentation}
      />
    );
    expect(screen.getByRole('img', { name: /image_1/i })).toBeInTheDocument();
  });

  it('opens delete modal when element is right-clicked', () => {
    render(
      <Slide
        displaySlide={mockDisplaySlide}
        slides={mockSlides}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        preview={false}
        presentation={mockPresentation}
      />
    );
  
    fireEvent.contextMenu(screen.getByText('hello'));
      expect(screen.getByText('Do you really want to permanently delete this element?')).toBeInTheDocument();
  });

})