import type { Preview } from "@storybook/react";
import { vi } from 'vitest';

// Mock the store globally
vi.mock('../src/store/markdownStore', () => ({
  markdownStore: vi.fn(() => ({
    slides: [
      { id: '1', content: '# Test Slide', layout: 'default' },
      { id: '2', content: '# Another Slide', layout: 'default' }
    ],
    activeSlideId: '1',
    updateSlideContent: vi.fn(),
    updateSlideLayout: vi.fn(),
    setActiveSlide: vi.fn()
  }))
}));

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
    },
  },
};

export default preview; 