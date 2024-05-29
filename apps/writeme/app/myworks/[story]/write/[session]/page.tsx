"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
/* eslint-disable-next-line */
export interface MyworksProps {}

export default function Myworks(props: MyworksProps) {
  const editor = useCreateBlockNote();
  return (
    <div >
        <BlockNoteView editor={editor} />
    </div>
  );
}
