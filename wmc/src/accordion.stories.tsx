// import the component you want to make a story for
import { Accordion, AccordionContent,
    AccordionItem,
    AccordionTrigger, } from './accordion';

// A story has a lot of options, but the only required one is to specify the component we want to render
// Setting up the story's default component
export default {
  component: Accordion,
  parameters: {
    layout: 'fullscreen',
  },
};

export const DefaultAccordion = {
  render: () => (<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>)
,
};