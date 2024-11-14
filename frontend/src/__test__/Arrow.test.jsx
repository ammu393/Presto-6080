import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Presentation from '../pages/Presentation/Presentation';
import UpArrow from '../components/UpArrow';
import upArrowGrey from '../assets/slideArrows/leftArrow-grey.svg';
import upArrowBlack from '../assets/slideArrows/leftArrow-black.svg';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(() => ({ presentationId: '1', slideNum: '1' })), // Provide mock params
  MemoryRouter: vi.fn(({ children }) => <div>{children}</div>) // Mock MemoryRouter

}));

const mockStoreWithZeroSlide = {
        presentations: [
          {
            presentationId: '1',
            thumbnail: "",
            title: "pres1",
            description: "",
            slides: [

            ],
            backgroundStyle: {
              type: "solid",
              firstColour: "white",
              secondColour: null,
              gradientDirection: null,
              src: null
            }
          }
        ]
      }

      const mockStoreWithTwoSlides = {
        presentations: [
          {
            presentationId: '1',
            thumbnail: "",
            title: "pres1",
            description: "",
            slides: [
              {
                slideId:'1',
                elements:[],
                backgroundStyle: {
                  type:null,
                  firstColour:null,
                  secondColour:null,
                  gradientDirection:null,
                  src:null
                }
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
            ],
            backgroundStyle: {
              type: "solid",
              firstColour: "white",
              secondColour: null,
              gradientDirection: null,
              src: null
            }
          }
        ]
      }


describe('up Arrow Button', () => {

  it('renders the UpArrow component', () => {
    render(<UpArrow onClick={() => {}} />);
    expect(screen.getByRole('link', { name: /Previous Slide/i })).toBeInTheDocument();
  });

  it('displays the black arrow when hovered', () => {
    const mockOnClick = vi.fn(); 
    render(<UpArrow onClick={mockOnClick} />);
    const arrowImage = screen.getByRole('img');

    expect(arrowImage).toHaveAttribute('src', upArrowGrey);

    fireEvent.mouseEnter(arrowImage);
    expect(arrowImage).toHaveAttribute('src', upArrowBlack);
    fireEvent.mouseLeave(arrowImage);
    expect(arrowImage).toHaveAttribute('src', upArrowGrey);
  });

  it('calls the onClick function when clicked', () => {
    const mockOnClick = vi.fn();
    render(<UpArrow onClick={mockOnClick} />);
  
    const arrowLink = screen.getByRole('link');
    fireEvent.click(arrowLink);
  
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('no upArrow if only one slide is present', () => {
    render(
      <Presentation 
        token="test" 
        store={mockStoreWithZeroSlide} 
        setStore={() => {}} 
      />
    );

    screen.logTestingPlaygroundURL();
    const upArrow = screen.queryByRole('img', { name: /Previous Slide/i });

    expect(upArrow).toBeNull(); 
  });

  it('renders upArrow if more than one slide', () => {
    render(
      <Presentation 
        token="test" 
        store={mockStoreWithTwoSlides} 
        setStore={() => {}} 
      />
    );

    const upArrow = screen.queryByRole('img', { name: /Previous Slide/i });
    expect(upArrow).toBeVisible(); 
  });

})