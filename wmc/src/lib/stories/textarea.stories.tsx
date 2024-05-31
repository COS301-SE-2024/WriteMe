import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '../ui/textarea';

const meta = {
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ()=> {
    return(
      <Textarea />
    )
  }
};
