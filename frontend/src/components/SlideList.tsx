// import type { Meta, StoryObj } from '@storybook/react';
// import SlideList from './SlideList.tsx';  

// const meta = {
//   title: 'Slides/SlideList',
//   component: SlideList,
//   parameters: {
//     layout: 'centered',
//   },
//   tags: ['autodocs'],
// } satisfies Meta<typeof SlideList>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const SingleSlide: Story = {
//   args: {
//     slides: [
//       {
//         id: '1',
//         content: '# Single Slide\nThis is a simple slide with basic content.',
//         layout: 'default'
//       }
//     ],
//     activeSlideId: '1'
//   },
// };

// export const MultipleSlides: Story = {
//   args: {
//     slides: [
//       {
//         id: '1',
//         content: '# First Slide\nThis is the first slide.',
//         layout: 'default'
//       },
//       {
//         id: '2',
//         content: '# Second Slide\nThis is the second slide.',
//         layout: 'default'
//       },
//       {
//         id: '3',
//         content: '# Third Slide\nThis is the third slide.',
//         layout: 'default'
//       }
//     ],
//     activeSlideId: '1'
//   },
// };

// export const SlideWithFocusedView: Story = {
//   args: {
//     slides: [
//       {
//         id: '1',
//         content: '# Focused Slide\nThis slide is currently focused.',
//         layout: 'default'
//       },
//       {
//         id: '2',
//         content: '# Other Slide\nThis slide is not focused.',
//         layout: 'default'
//       }
//     ],
//     activeSlideId: '1',
//     isFocused: true
//   },
// }; 