import type { Meta, StoryObj } from '@storybook/react';
import { CardStack } from '../ui/card-stack';

const meta = {
  component: CardStack,
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of card items to be displayed in the stack',
      defaultValue: [],
      table: {
        type: { summary: 'Array<{ id: number, name: string, designation: string, content: React.ReactNode }>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
} satisfies Meta<typeof CardStack>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 0,
    name: "Lirael Dawnstar",
    designation: "Elven",
    content: (
      <p>
        Raised in the secluded forests of Elaria, Lirael is a skilled healer and a guardian of ancient knowledge. She is well-versed in herbalism and ancient magic, often sought after for her wisdom.
      </p>
    ),
  },
  {
    id: 1,
    name: "Gregor Thorne",
    designation: "Mercenary",
    content: (
      <p>
        A former soldier turned mercenary, Gregor has seen countless battles. He now works as a freelance protector, offering his services to those in need of a <span className="font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5">skilled warrior</span>.
      </p>
    ),
  },
  {
    id: 2,
    name: "Mira Solara",
    designation: "Pickpocket",
    content: (
      <p>
        Mira grew up in a bustling trade town, where she learned the art of thievery and espionage. Now, she travels the world as a <span className="font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5">spy for hire</span>, gathering information and artifacts.
      </p>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  render: (args) => <CardStack {...args} />,
};
