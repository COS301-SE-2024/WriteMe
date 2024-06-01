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
import { useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { BlockNoteEditor } from '@blocknote/core';

// Our <Editor> component we can reuse later


export interface EditorProps {
  initialBlocks: any,
  setBlocks: any,
}

export default function Editor({initialBlocks, setBlocks}:EditorProps) {
  console.log(initialBlocks);
  // const [blocks, setBlocks] = useState(initialBlocks);
  const theme = useTheme();


  // Creates a new editor instance.
  // const editor = useCreateBlockNote({ });
  const editor = useMemo(() => {
    console.log(initialBlocks);
    console.log(initialBlocks.length)
    if (initialBlocks.length === 0 || initialBlocks.length == undefined) {
      return BlockNoteEditor.create();
    }
    return BlockNoteEditor.create({ initialContent: initialBlocks });
  }, []);



  // Renders the editor instance using a React component.
  return <BlockNoteView
    editor={editor}
    theme={theme.theme as any}
    onChange={() => {
      // Saves the document JSON to state.
      // console.log(editor.document)
      setBlocks(editor.document);
    }}

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
