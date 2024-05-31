import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem, ProductItem, HoveredLink } from '../ui/navbar-menu';
import { useState } from 'react';

const meta: Meta<typeof Menu> = {
  component: Menu,
  argTypes: {
    setActive: { action: 'setActive' },
    children: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const MenuStory = (args: any) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Menu {...args} setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="Home">
        <HoveredLink href="/">Go to Home</HoveredLink>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Products">
        <ProductItem
          title="Product 1"
          description="This is Product 1"
          href="/products/1"
          src="/images/product1.jpg"
        />
        <ProductItem
          title="Product 2"
          description="This is Product 2"
          href="/products/2"
          src="/images/product2.jpg"
        />
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="About">
        <HoveredLink href="/about">Learn more about us</HoveredLink>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Contact">
        <HoveredLink href="/contact">Get in touch</HoveredLink>
      </MenuItem>
    </Menu>
  );
};

export const Default: Story = {
  args: {
    setActive: (item: string | null) => {},
    children: null,
  },
  render: (args) => <MenuStory {...args} />,
};
