import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';
import '../index.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button Component

A versatile button component that provides interactive actions to users.

## Features
- Customizable through className prop
- Full accessibility support
- Disabled state support
- Extends native button HTML attributes

## Usage
\`\`\`tsx
import { Button } from './components/Button';

// Basic usage
<Button>Click me</Button>

// With custom class
<Button className="custom-button">Custom Button</Button>

// Disabled state
<Button disabled>Disabled Button</Button>
\`\`\`

## Props
| Prop | Type | Description |
|------|------|-------------|
| className | string | Optional CSS class name |
| children | ReactNode | Button content |
| disabled | boolean | Whether the button is disabled |
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'CSS class name for custom styling',
      control: 'text',
    },
    children: {
      description: 'Button content',
      control: 'text',
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic button with default styling
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic button with default styling. Use this as a starting point for most button implementations.'
      }
    }
  }
};

/**
 * Button with custom styling through className
 */
export const CustomStyled: Story = {
  args: {
    className: 'nav-button',
    children: 'Custom Styled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how to apply custom styling using the className prop. The nav-button class provides a specific navigation style.'
      }
    }
  }
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    className: 'nav-button',
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the button appears when disabled. Disabled buttons cannot be clicked and typically have a visual indication of their disabled state.'
      }
    }
  }
};

export const LayoutOption: Story = {
  args: {
    className: "layout-option",
    children: 'Layout Option',
  },
};
export const LayoutButton: Story = {
  args: {
    className: "layout-button",
    children: 'Layout Button',
  },
};

export const LayoutDropdown: Story = {
  args: {
    className: "layout-option",
    children: 'Layout Dropdown',
  },
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <Button className="layout-option" onClick={() => {}}>Default</Button>
        <Button className="layout-option" onClick={() => {}}>Centered</Button>
        <Button className="layout-option" onClick={() => {}}>Two Column</Button>
      </div>
    );
  },
};
