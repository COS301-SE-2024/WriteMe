"use client";
// import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Select } from '@writeme/wmc/lib/ui/select';
import { Button, Card, Input, Label } from '@writeme/wmc';
import { Badge } from '@writeme/wmc/lib/ui/badge';
import { Popover } from '@writeme/wmc/lib/ui/popover';
import { Tooltip } from '@writeme/wmc/lib/ui/tooltip';
import { Toggle } from '@writeme/wmc/lib/ui/toggle';
import { Tabs } from '@writeme/wmc/lib/ui/tabs';
import { DropdownMenu } from '@writeme/wmc/lib/ui/dropdown-menu';
import { Form } from '@writeme/wmc/lib/ui/form';

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();




  // Renders the editor instance using a React component.
  return <BlockNoteView
    editor={editor}
    theme={'light'}
    shadCNComponents={{
      Select,
      Card,
      Badge,
      Input,
      Label,
      Popover,
      Tooltip,
      Toggle,
      Tabs,
      Button,
      DropdownMenu,
      Form,
    }}

  />;
}
