
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteButton from '../components/DeleteButton';
import axios from 'axios';
import { ErrorContext, ErrorProvider } from '../contexts/ErrorContext';

vi.mock('axios');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('DeleteButton Component', () => {
  const mockSetDisplaySlide = vi.fn();
  const mockSetStore = vi.fn();
  const mockSetSlides = vi.fn();
  const mockNavigate = vi.fn();
  const mockUpdateURL = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(mockNavigate);
  });

  const mockStore = {
    presentations: [
      {
        presentationId: '1',
        slides: [
          { slideId: 's1', content: 'Slide 1' },
          { slideId: 's2', content: 'Slide 2' },
        ],
      },
    ],
  };

  const renderComponent = () =>
    render(
      <ErrorProvider>
        <DeleteButton
          setDisplaySlide={mockSetDisplaySlide}
          token="test-token"
          store={mockStore}
          setStore={mockSetStore}
          presentationId="1"
          displaySlide={{ slideId: 's1' }}
          setSlides={mockSetSlides}
          updateURL={mockUpdateURL}
        />
      </ErrorProvider>
    );

  it('renders DeleteButton with correct initial icon', () => {
    renderComponent();

    const deleteIcon = screen.getByRole('img', { name: 'Delete Slide' });
    expect(deleteIcon).toBeInTheDocument();
    expect(deleteIcon).toHaveAttribute('src', expect.stringContaining('delete-grey.svg'));
  });

  it('changes icon on hover', async () => {
    renderComponent();

    const deleteButton = screen.getByRole('link');
    const deleteIcon = screen.getByRole('img', { name: 'Delete Slide' });

    fireEvent.mouseEnter(deleteButton);
    expect(deleteIcon).toHaveAttribute('src', expect.stringContaining('delete-red.svg'));

    fireEvent.mouseLeave(deleteButton);
    expect(deleteIcon).toHaveAttribute('src', expect.stringContaining('delete-grey.svg'));
  });

  it('opens confirmation modal when deleting the last slide', async () => {
    const mockStoreWithSingleSlide = {
      presentations: [
        {
          presentationId: '1',
          slides: [{ slideId: 's1', content: 'Slide 1' }],
        },
      ],
    };

    render(
      <ErrorProvider>
        <DeleteButton
          setDisplaySlide={mockSetDisplaySlide}
          token="test-token"
          store={mockStoreWithSingleSlide}
          setStore={mockSetStore}
          presentationId="1"
          displaySlide={{ slideId: 's1' }}
          setSlides={mockSetSlides}
          updateURL={mockUpdateURL}
        />
      </ErrorProvider>
    );

    const deleteButton = screen.getByRole('link');
    fireEvent.click(deleteButton);

    expect(screen.getByText(/Last Slide!/i)).toBeInTheDocument();
    expect(screen.getByText(/Deleting the last slide will delete the entire presentation/i)).toBeInTheDocument();
  });

  it('deletes a slide and updates state', async () => {
    axios.put.mockResolvedValue({ status: 200 });
    renderComponent();

    const deleteButton = screen.getByRole('link');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockSetSlides).toHaveBeenCalledWith([{ slideId: 's2', content: 'Slide 2' }]);
      expect(mockSetDisplaySlide).toHaveBeenCalledWith({ slideId: 's2', content: 'Slide 2' });
      expect(mockUpdateURL).toHaveBeenCalled();
    });

    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5005/store',
      expect.objectContaining({ store: expect.any(Object) }),
      expect.any(Object)
    );
  });
  it('confirms delete in modal', async () => {
    axios.put.mockResolvedValue({ status: 200 });

    const mockStoreWithSingleSlide = {
      presentations: [
        {
          presentationId: '1',
          slides: [{ slideId: 's1', content: 'Slide 1' }],
        },
      ],
    };

    render(
      <ErrorProvider>
        <DeleteButton
          setDisplaySlide={mockSetDisplaySlide}
          token="test-token"
          store={mockStoreWithSingleSlide}
          setStore={mockSetStore}
          presentationId="1"
          displaySlide={{ slideId: 's1' }}
          setSlides={mockSetSlides}
          updateURL={mockUpdateURL}
        />
      </ErrorProvider>
    );

    const deleteButton = screen.getByRole('link');
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });
});
