import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../ui/input';

const meta = {
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
      description: 'Specifies the type of input',
      defaultValue: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input field',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
  render: (args) => {
    return <Input {...args} />;
  },
};
