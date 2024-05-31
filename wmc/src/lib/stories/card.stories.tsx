import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '../ui/card';

const meta = {
  component: Card,
  argTypes: {

    content: { 
      control: 'text'
    }
  } 

} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Harry Potter"
  },
  render: ({content}) => {
    return (

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    )
  }
};