import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import LayoutSelector from '../LayoutSelector'

// Mock the store
const mockUpdateSlideLayout = jest.fn();
jest.mock('../../store/markdownStore', () => ({
  markdownStore: jest.fn(() => ({
    activeSlideId: '1',
    updateSlideLayout: mockUpdateSlideLayout
  }))
}))

// Mock the icon components
jest.mock('../../assets/icons/Layout', () => ({
  __esModule: true,
  default: () => <div data-testid="layout-icon">Layout Icon</div>
}))

jest.mock('../../assets/icons/DefaultLayout', () => ({
  __esModule: true,
  default: () => <div data-testid="default-layout-icon">Default Layout Icon</div>
}))

jest.mock('../../assets/icons/SplitLayout', () => ({
  __esModule: true,
  default: () => <div data-testid="split-layout-icon">Split Layout Icon</div>
}))

jest.mock('../../assets/icons/CenteredLayout', () => ({
  __esModule: true,
  default: () => <div data-testid="centered-layout-icon">Centered Layout Icon</div>
}))

jest.mock('../../assets/icons/TwoColumnLayout', () => ({
  __esModule: true,
  default: () => <div data-testid="two-column-layout-icon">Two Column Layout Icon</div>
}))

describe('LayoutSelector', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the layout button', () => {
    render(<LayoutSelector />)
    expect(screen.getByRole('button', { name: /select layout/i })).toBeInTheDocument()
  })

  it('opens dropdown when clicking the layout button', async () => {
    render(<LayoutSelector />)
    
    // Initially dropdown should be closed
    expect(screen.queryByText('Default')).not.toBeInTheDocument()
    
    // Click layout button
    const layoutButton = screen.getByRole('button', { name: /select layout/i })
    await act(async () => {
      await userEvent.click(layoutButton)
    })
    
    // Dropdown should be open
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.getByText('Split')).toBeInTheDocument()
    expect(screen.getByText('Centered')).toBeInTheDocument()
    expect(screen.getByText('Two Column')).toBeInTheDocument()
  })

  it('changes layout when selecting an option', async () => {
    render(<LayoutSelector />)
    
    // Open dropdown
    const layoutButton = screen.getByRole('button', { name: /select layout/i })
    await act(async () => {
      await userEvent.click(layoutButton)
    })
    
    // Select a layout
    const splitLayoutButton = screen.getByText('Split')
    await act(async () => {
      await userEvent.click(splitLayoutButton)
    })
    
    // Wait for state updates and verify
    await waitFor(() => {
      expect(mockUpdateSlideLayout).toHaveBeenCalledWith('1', 'split')
      expect(screen.queryByText('Default')).not.toBeInTheDocument()
    })
  })

  it('closes dropdown when pressing Escape', async () => {
    render(<LayoutSelector />)
    
    // Open dropdown
    const layoutButton = screen.getByRole('button', { name: /select layout/i })
    await act(async () => {
      await userEvent.click(layoutButton)
    })
    
    // Press Escape
    await act(async () => {
      await userEvent.keyboard('{Escape}')
    })
    
    // Dropdown should be closed
    expect(screen.queryByText('Default')).not.toBeInTheDocument()
  })

  it('toggles dropdown when pressing Ctrl+L', async () => {
    render(<LayoutSelector />)
    
    // Initially dropdown should be closed
    expect(screen.queryByText('Default')).not.toBeInTheDocument()
    
    // Press Ctrl+L
    await act(async () => {
      await userEvent.keyboard('{Control>}l{/Control}')
    })
    
    // Dropdown should be open
    expect(screen.getByText('Default')).toBeInTheDocument()
    
    // Press Ctrl+L again
    await act(async () => {
      await userEvent.keyboard('{Control>}l{/Control}')
    })
    
    // Dropdown should be closed
    expect(screen.queryByText('Default')).not.toBeInTheDocument()
  })

  it('does not toggle dropdown when pressing Ctrl+L in input fields', async () => {
    render(<LayoutSelector />)
    
    // Create an input field
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()
    
    // Press Ctrl+L
    await act(async () => {
      await userEvent.keyboard('{Control>}l{/Control}')
    })
    
    // Dropdown should remain closed
    expect(screen.queryByText('Default')).not.toBeInTheDocument()
    
    // Cleanup
    document.body.removeChild(input)
  })
}) 