import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../ui/label';

const meta = {
  component: Label,
  argTypes: {
    htmlFor: {
      control: { type: 'text' },
      description: 'The id of the input element that this label is associated with',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'The text content of the label',
      defaultValue: '',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '' },
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: 'email',
    children: 'Your email address',
  },
  render: (args) => {
    return <Label {...args} />;
  },
};
