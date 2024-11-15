import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SlideElement from '../components/elements/SlideElement';

describe('ImageElement Component', () => {
  const mockElement = {
    type: 'image',
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder Image',
    top: '10%',
    left: '20%',
    width: '30%',
    height: '40%',
  };

  const setup = (props = {}) => {
    return render(
      <SlideElement
        element={mockElement}
        updateElementPosition={() => {}}
        onDoubleClick={() => {}}
        onContextMenu={() => {}}
        onSingleClick={() => {}}
        selected={true}
        displaySlide={true}
        preview={false}
        {...props}
      />
    );
  };

  it('renders the image with correct src and alt', () => {
    setup();
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockElement.src);
    expect(img).toHaveAttribute('alt', mockElement.alt);
  });

  it('applies correct styles', () => {
    setup();
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({
      width: '30%',
      height: '40%',
      objectFit: 'cover',
    });
  });

  it('uses the default alt text when none is provided', () => {
    const elementWithoutAlt = { ...mockElement, alt: undefined };
    setup({ element: elementWithoutAlt });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Slide image');
  });

  it('renders the image within a positioned container', () => {
    setup();
    const container = screen.getByRole('img');
    expect(container).toHaveStyle({
      top: mockElement.top,
      left: mockElement.left,
      width: mockElement.width,
      height: mockElement.height,
      position: 'absolute',
    });
  });
});
