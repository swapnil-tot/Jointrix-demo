import type { Meta, StoryObj } from '@storybook/react';
import SlideNavigator from '../components/SlideNavigator.tsx';
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

const meta = {
  title: 'Components/SlideNavigator',
  component: SlideNavigator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SlideNavigator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    mockData: {
      slides: [
        { id: '1', content: '# Test Slide', layout: 'default' },
        { id: '2', content: '# Another Slide', layout: 'default' }
      ],
      activeSlideId: '1',
      setActiveSlide: () => {}
    }
  }
};

export const WithMultipleSlides: Story = {
  args: {},
  parameters: {
    mockData: {
      slides: [
        { id: '1', content: '# First Slide', layout: 'default' },
        { id: '2', content: '# Second Slide', layout: 'split' },
        { id: '3', content: '# Third Slide', layout: 'centered' }
      ],
      activeSlideId: '1'
    }
  }
};

export const WithActiveSlide: Story = {
  args: {},
  parameters: {
    mockData: {
      slides: [
        { id: '1', content: '# First Slide', layout: 'default' },
        { id: '2', content: '# Second Slide', layout: 'split' }
      ],
      activeSlideId: '2'
    }
  }
};

export const Empty: Story = {
  args: {},
  parameters: {
    mockData: {
      slides: [],
      activeSlideId: ''
    }
  }
}; 