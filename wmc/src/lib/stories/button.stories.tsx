import type { Meta, StoryObj } from '@storybook/react';

import { Button, buttonVariants } from '../ui/button';

const meta = {
  component: Button,
  argTypes: {

    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: 'radio'
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: 'radio'
    },
    children: {
      control: 'text'
    },

  },

} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'default',
    variant: 'default',
    children: "Hello World"
  },
  render: ({size, variant, children }) => {
    return (
      <Button variant={variant} size={size}>{children}</Button>
    )
  }
};


