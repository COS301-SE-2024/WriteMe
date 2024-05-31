import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../ui/skeleton';

const meta: Meta = {
  component: Skeleton,
  argTypes: {
    className: { control: 'text' }, 
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Define the Default story
export const Default: Story = ({ className }: { className?: string }) => (
  <Skeleton className={className} />
);

Default.args = {
  className: 'w-[100px] h-[20px] rounded-full',
};
