// import type { Meta, StoryObj } from '@storybook/react';
// import SlideViewer from './SlideViewer.tsx';

// const meta = {
//   title: 'Slides/SlideViewer',
//   component: SlideViewer,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
// } satisfies Meta<typeof SlideViewer>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const PreviewMode: Story = {
//   args: {
//     mode: 'preview',
//     slide: {
//       id: '1',
//       content: `# Preview Mode
// This is how the slide looks in preview mode.

// ## Features
// - Clean presentation
// - No editing controls
// - Focus on content`,
//       layout: 'default'
//     }
//   },
// };

// export const EditMode: Story = {
//   args: {
//     mode: 'edit',
//     slide: {
//       id: '1',
//       content: `# Edit Mode
// This is how the slide looks in edit mode.

// ## Features
// - Editing controls visible
// - Real-time preview
// - Markdown support`,
//       layout: 'default'
//     }
//   },
// };

// export const EmptySlide: Story = {
//   args: {
//     mode: 'edit',
//     slide: {
//       id: '1',
//       content: '',
//       layout: 'default'
//     }
//   },
// };

// export const SplitView: Story = {
//   args: {
//     mode: 'split',
//     slide: {
//       id: '1',
//       content: `# Split View
// This is how the slide looks in split view mode.

// ## Features
// - Editor on the left
// - Preview on the right
// - Real-time updates`,
//       layout: 'default'
//     }
//   },
// }; 