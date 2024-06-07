import type { Meta, StoryObj } from '@storybook/react';

import { PopoverDemo } from '../ui/share-story';

const meta = {
  component: PopoverDemo,
} satisfies Meta<typeof PopoverDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};