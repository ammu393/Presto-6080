import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PresentationCard } from '../components/PresentationCard';
import { useNavigate } from 'react-router-dom';
import sampleThumbnail from '../assets/sample-image.jpg';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('PresentationCard Component', () => {
  it('renders title, description, number of slides, and thumbnail', () => {
    render(
      <PresentationCard 
        title="Sample Title" 
        description="Sample Description" 
        numSlides={10} 
        presentationId="123" 
        thumbnail={sampleThumbnail}
      />
    );

    // Test that the presentation card displays all the required features
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(screen.getByText('Sample Description')).toBeInTheDocument();
    expect(screen.getByText('Number of Slides: 10')).toBeInTheDocument();
    const image = screen.getByAltText(`Sample Title Thumbnail`);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(sampleThumbnail); 
  });

  it('displays grey background when no thumbnail is provided', () => {
    render(
      <PresentationCard 
        title="Sample Title" 
        description="Sample Description" 
        numSlides={10} 
        presentationId="123" 
      />
    );
    
    // Tests that it displays a grey background when no thumbnail is provided
    const thumbnailContainer = screen.getByRole('group', { name: /presentation card/i }).querySelector('.w-full.h-3\\/4');
    expect(thumbnailContainer).toHaveClass('bg-gray-300');
  });

  it('navigates to the presentation page on click', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <PresentationCard 
        title="Sample Title" 
        description="Sample Description" 
        numSlides={10} 
        presentationId="123" 
        thumbnail="sample-thumbnail.jpg" 
      />
    );

    // Test if when you click on the presentation card it takes you to the presentation page
    const card = screen.getByRole('group', { name: /presentation card/i });
    fireEvent.click(card);
    expect(navigate).toHaveBeenCalledWith('/presentations/123/1');
  });

  it('applies correct aspect ratio and responsive styles', () => {
    render(
      <PresentationCard 
        title="Sample Title" 
        description="Sample Description" 
        numSlides={10} 
        presentationId="123" 
        thumbnail="sample-thumbnail.jpg" 
      />
    );

    // Tests if the card is the correct ratio as required by the spec
    const card = screen.getByRole('group', { name: /presentation card/i });
    expect(card).toHaveClass('aspect-[2/1]');
  });

  it('has a minimum width of 100px', () => {
    render(
      <PresentationCard 
        title="Sample Title" 
        description="Sample Description" 
        numSlides={10} 
        presentationId="123" 
        thumbnail="sample-thumbnail.jpg" 
      />
    );

    // Tests that the card has a minimum width of 100px as required by spec
    const card = screen.getByRole('group', { name: /presentation card/i });
    expect(card).toHaveClass('w-min-[100px]');
  });
});
