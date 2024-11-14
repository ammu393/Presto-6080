import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TextPropertiesModal from '../components/modals/TextPropertiesModal';

describe('TextPropertiesModal Component', () => {
  const mockAddElementToSlide = vi.fn();
  const mockCloseTextModal = vi.fn();
  const mockDeleteElementFromSlide = vi.fn();
  const sampleElement = {
    elementId: '123',
    text: 'Sample text',
    width: '50%',
    height: '20%',
    fontSize: '1.5em',
    color: '#123456',
    top: '10%',
    left: '15%',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when opened', () => {
    render(
      <TextPropertiesModal
        isOpen={true}
        closeTextModal={mockCloseTextModal}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        displaySlide={{}}
        currentElement={null}
      />
    );

    // Check for modal and the correct properties
    expect(screen.getByLabelText('Text properties modal')).toBeInTheDocument();
    expect(screen.getByText(/New Text/i)).toBeInTheDocument();
    expect(screen.getByText(/Width \(%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Height \(%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Font Size \(in em\):/i)).toBeInTheDocument();
    expect(screen.getByText(/Text Color \(HEX\):/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your text here')).toBeInTheDocument();
  });

  it('populates fields with current element properties when editing', () => {
    render(
      <TextPropertiesModal
        isOpen={true}
        closeTextModal={mockCloseTextModal}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        displaySlide={{}}
        currentElement={sampleElement}
      />
    );

    // Pre-populated fields
    expect(screen.getByDisplayValue('Sample text')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('#123456')).toBeInTheDocument();
  });

  it('updates field values when user types', () => {
    render(
      <TextPropertiesModal
        isOpen={true}
        closeTextModal={mockCloseTextModal}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        displaySlide={{}}
        currentElement={null}
      />
    );

    // Entering text updates the input box
    const textInput = screen.getByPlaceholderText('Enter your text here');
    fireEvent.change(textInput, { target: { value: 'Updated text' } });
    expect(textInput.value).toBe('Updated text');

    // Changing the font updates the input box
    const fontSizeInput = screen.getByPlaceholderText('e.g. 1.5');
    fireEvent.change(fontSizeInput, { target: { value: '2' } });
    expect(fontSizeInput.value).toBe('2');
  });

  it('calls close function on cancel', () => {
    render(
      <TextPropertiesModal
        isOpen={true}
        closeTextModal={mockCloseTextModal}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        displaySlide={{}}
        currentElement={null}
      />
    );

    // Clicking on the cancel button closes the modal
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockCloseTextModal).toHaveBeenCalled();
  });

  it('does not render modal when isOpen is false', () => {
    render(
      <TextPropertiesModal
        isOpen={false}
        closeTextModal={mockCloseTextModal}
        addElementToSlide={mockAddElementToSlide}
        deleteElementFromSlide={mockDeleteElementFromSlide}
        displaySlide={{}}
        currentElement={null}
      />
    );

    expect(screen.queryByLabelText('Text properties modal')).not.toBeInTheDocument();
  });
});
