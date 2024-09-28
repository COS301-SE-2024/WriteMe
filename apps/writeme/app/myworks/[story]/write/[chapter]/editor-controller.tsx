"use client";

import dynamic from 'next/dynamic';
import React, { createContext, useContext, useEffect, useState } from 'react';
const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });
import { EditorContext } from './editor-context';
import { useBlockNoteEditor } from '@blocknote/react';

let interval: any;

const EditorController = () => {
  const { story, setStory, blocks, setBlocks } = useContext(EditorContext);
  useEffect(() => {
    console.log(blocks)
  },[blocks])
  // const editor = useBlockNoteEditor();
  // console.log(editor.document)

  return (
    <div>
      <Editor initialBlocks={blocks} setBlocks={setBlocks} ></Editor>
    </div>
  );
};

export default EditorController;
