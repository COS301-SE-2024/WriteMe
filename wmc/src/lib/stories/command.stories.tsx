import type { Meta, StoryObj } from '@storybook/react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '../ui/command';

// Define the meta information with argTypes
const meta: Meta = {
  component: Command,
};

export default meta;

type Story = StoryObj<typeof meta>;

// Define the Default story with args and render function
export const Default: Story = (args: any) => (
  <Command>
    <CommandInput placeholder={args.inputPlaceholder} />
    <CommandList>
      <CommandEmpty>{args.emptyText}</CommandEmpty>
      <CommandGroup heading={args.groupHeading}>
        <CommandItem>{args.itemText}</CommandItem>
        <CommandItem>Search Emoji</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>Profile</CommandItem>
        <CommandItem>Billing</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

// Set default arguments for the Default story
Default.args = {
  inputPlaceholder: 'Type a command or search...',
  emptyText: 'No results found.',
  groupHeading: 'Suggestions',
  itemText: 'Calendar',
};
