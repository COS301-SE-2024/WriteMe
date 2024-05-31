import type { Meta, StoryObj } from '@storybook/react';


import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';


const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  argTypes:{
    title: {
      control: 'text'
    },
    content: {
      control: 'text'
    },
    type: {
      options: ['single', 'multiple'],
      control: 'radio'
    }
  },

  args: {
    title: 'This is some useful information',
    type: 'single',
    content: "this is the more detailed content of the Accordion"
  },

  render: ({title, type, content}) => {
    return (
      <Accordion type={type} collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            {content}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
};

