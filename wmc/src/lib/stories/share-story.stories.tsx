import type { Meta, StoryObj } from '@storybook/react';

import { ShareStory } from '../ui/share-story';

const meta = {
  component: ShareStory,
} satisfies Meta<typeof ShareStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    link: "https://writeme.co.za/stories/272cc491-7b61-44ec-9860-691420a0a886",
    message: "Check this out"
  }
};