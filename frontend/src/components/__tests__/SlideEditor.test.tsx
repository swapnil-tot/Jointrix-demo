import { render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { markdownStore } from '../../store/markdownStore';
import SlideEditor from '../SlideEditor';

// Mock the store
jest.mock('../../store/markdownStore', () => ({
  markdownStore: jest.fn(() => ({
    slides: [
      { id: '1', content: '# Test Slide', layout: 'default' },
      { id: '2', content: '# Another Slide', layout: 'default' }
    ],
    activeSlideId: '1',
    updateSlideContent: jest.fn(),
    setActiveSlide: jest.fn()
  }))
}));

// Mock the child components
jest.mock('../SlideRender', () => ({
  __esModule: true,
  default: () => <div data-testid="slide-renderer">Slide Renderer</div>
}));

jest.mock('../LayoutSelector', () => ({
  __esModule: true,
  default: () => <div data-testid="layout-selector">Layout Selector</div>
}));

describe('SlideEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the editor in edit mode by default', () => {
    render(<SlideEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByTestId('slide-renderer')).not.toBeInTheDocument();
  });

  it('switches between edit and preview modes', async () => {
    render(<SlideEditor />);
    
    // Initially in edit mode
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Click preview button
    const previewButton = screen.getByRole('button', { name: /preview/i });
    await act(async () => {
      await userEvent.click(previewButton);
    });
    
    // Should show preview
    expect(screen.getByTestId('slide-renderer')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    
    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    await act(async () => {
      await userEvent.click(editButton);
    });
    
    // Should show editor again
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByTestId('slide-renderer')).not.toBeInTheDocument();
  });


  it('renders layout selector', () => {
    render(<SlideEditor />);
    expect(screen.getByTestId('layout-selector')).toBeInTheDocument();
  });

  it('handles empty slides gracefully', () => {
    jest.mocked(markdownStore).mockImplementationOnce(() => ({
      slides: [],
      activeSlideId: '',
      updateSlideContent: jest.fn(),
      setActiveSlide: jest.fn()
    }));

    render(<SlideEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
}); 