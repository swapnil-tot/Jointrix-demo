import type { Meta, StoryObj } from '@storybook/react';
import LayoutSelector from '../components/LayoutSelector.tsx';

const meta = {
  title: 'Primitive/LayoutSelector',
  component: LayoutSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LayoutSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

