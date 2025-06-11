import type { Meta, StoryObj } from '@storybook/react';
import SlideEditor from '../components/SlideEditor';
import { markdownStore } from '../store/markdownStore';
import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

/**
 * The SlideEditor component is a rich text editor specifically designed for creating and editing presentation slides.
 * It features:
 * - Real-time markdown editing with syntax highlighting
 * - Live preview mode
 * - Layout selection
 * - Debounced content updates
 * - Support for code blocks with syntax highlighting
 */
const meta = {
  title: 'Components/SlideEditor',
  component: SlideEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# SlideEditor Component

A powerful markdown editor specifically designed for creating and editing presentation slides.

## Features
- Real-time markdown editing with syntax highlighting
- Live preview mode
- Layout selection
- Debounced content updates
- Support for code blocks with syntax highlighting

## Usage
\`\`\`tsx
import { SlideEditor } from './components/SlideEditor';
import { markdownStore } from './store/markdownStore';

// Basic usage with default store
<SlideEditor />

// With custom store
<SlideEditor store={customStore} />
\`\`\`

## Store Interface
The component expects a store with the following interface:

\`\`\`typescript
interface MarkdownState {
  slides: Array<{
    id: string;
    title: string;
    content: string;
    layout: string;
  }>;
  activeSlideId: string;
  updateSlideContent: (id: string, content: string) => void;
  setActiveSlide: (id: string) => void;
  getActiveSlide: () => Slide | undefined;
  isPending: boolean;
}
\`\`\`

## Features in Detail

### Markdown Editing
- Full markdown support
- Real-time syntax highlighting
- Code block support with language-specific highlighting
- Support for headings, lists, links, and more

### Preview Mode
- Toggle between edit and preview modes
- Real-time preview updates
- Layout-aware rendering
- Responsive design

### Layout Selection
- Multiple layout options
- Custom layout support
- Layout-specific styling

### Performance
- Debounced content updates
- Efficient rendering
- Optimized state management
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Reset store state before each story
      markdownStore.setState({
        slides: [],
        activeSlideId: '',
        updateSlideContent: () => { },
        setActiveSlide: () => { },
        getActiveSlide: () => undefined,
        isPending: false
      });
      return <Story />;
    }
  ]
} satisfies Meta<typeof SlideEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A basic example of the SlideEditor with an empty slide.
 * This story demonstrates the initial state of the editor and its basic functionality.
 */
export const EmptySlide: Story = {
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Empty Slide',
            content: '',
            layout: 'default',
          }
        ],
        activeSlideId: '1',
        updateSlideContent: (id: string, content: string) => {
          console.log('Content updated:', content);
          markdownStore.setState(state => ({
            slides: state.slides.map(slide =>
              slide.id === id ? { ...slide, content } : slide
            )
          }));
        },
        setActiveSlide: (id: string) => {
          markdownStore.setState({ activeSlideId: id });
        },
        getActiveSlide: () => markdownStore.getState().slides.find(s => s.id === markdownStore.getState().activeSlideId),
        isPending: false
      });
      return <Story />;
    }
  ],
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the SlideEditor with an empty slide. This is useful for:
- Starting a new presentation
- Understanding the basic editor interface
- Testing the initial state behavior

The empty slide provides a clean slate for users to start creating their content.
        `
      }
    }
  }
};

/**
 * Demonstrates the SlideEditor's capabilities with code-heavy content.
 * This story showcases syntax highlighting and code block support.
 */
export const CodeHeavySlide: Story = {
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Code Heavy Slide',
            content:
              '# Code Slide\n```javascript\nfunction add(a, b) {\n  return a + b;\n}\n```\n```python\ndef subtract(a, b):\n    return a - b\n```',
            layout: 'default',
          },
        ],
        activeSlideId: '1',
        updateSlideContent: (id: string, content: string) => {
          console.log('Saving content after delay:', content);
          markdownStore.setState(state => ({
            slides: state.slides.map(slide =>
              slide.id === id ? { ...slide, content } : slide
            )
          }));
        },
        setActiveSlide: (id: string) => {
          markdownStore.setState({ activeSlideId: id });
        },
        getActiveSlide: () => markdownStore.getState().slides.find(s => s.id === markdownStore.getState().activeSlideId),
        isPending: false
      });
      return <Story />;
    }
  ],
  parameters: {
    docs: {
      description: {
        story: `
Shows the SlideEditor's capabilities with code-heavy content. This story demonstrates:
- Syntax highlighting for multiple programming languages
- Code block formatting and styling
- Mixed content (markdown and code)
- Real-time code editing experience

Perfect for technical presentations or documentation slides.
        `
      }
    }
  }
};

/**
 * Demonstrates real-time typing and content updates in the SlideEditor.
 * This story showcases the interactive editing experience.
 */
export const WithLiveTyping: Story = {
  decorators: [
    (Story) => {
      markdownStore.setState({
        slides: [
          {
            id: '1',
            title: 'Live Typing Demo',
            content: '# Live Typing Demo\n\nTry typing here to see real-time updates.\n\n```javascript\nconst example = "Hello World";\nconsole.log(example);\n```',
            layout: 'default'
          }
        ],
        activeSlideId: '1',
        updateSlideContent: (id: string, content: string) => {
          console.log('Content updated:', content);
          markdownStore.setState(state => ({
            slides: state.slides.map(slide =>
              slide.id === id ? { ...slide, content } : slide
            )
          }));
        },
        setActiveSlide: (id: string) => {
          markdownStore.setState({ activeSlideId: id });
        },
        getActiveSlide: () => markdownStore.getState().slides.find(s => s.id === markdownStore.getState().activeSlideId),
        isPending: false
      });
      return <Story />;
    }
  ],
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the real-time editing capabilities of the SlideEditor. This story shows:
- Live content updates as you type
- Debounced saving to prevent excessive updates
- Mixed content types (text and code)
- Interactive editing experience

Try typing in the editor to see how the content updates in real-time.
        `
      }
    }
  }
};