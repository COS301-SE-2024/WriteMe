"use client"
import "@blocknote/mantine/style.css";
import {  useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';

interface ChapterViewProps {
  blocks: any
}

export default function ChapterViewer(props: ChapterViewProps){

  const theme = useTheme();

  const editor = useCreateBlockNote({
    initialContent: props.blocks
  })


  return (
    <div>
      <BlockNoteView editor={editor} editable={false} theme={theme.theme as any} >

      </BlockNoteView>

    </div>
  )
}
