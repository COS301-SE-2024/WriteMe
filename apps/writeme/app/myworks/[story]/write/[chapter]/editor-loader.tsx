"use client";


import React, { useState, ReactNode } from 'react';
import { EditorContext } from './editor-context';

export interface EditorLoaderProps {
  inputChapter: any;
  children?: ReactNode
}

const EditorLoader = ({inputChapter, children} : EditorLoaderProps) => {
  const [chapter, setChapter] = useState(inputChapter);
  const [blocks, setBlocks ] = useState(inputChapter?.blocks || [])
  const value = {chapter, setChapter, blocks, setBlocks};

  return (
    <>
      <EditorContext.Provider value={value}>
        {children}
      </EditorContext.Provider>
    </>
  );
};

export default EditorLoader;
