"use client";


import React, { useState, ReactNode } from 'react';
import { EditorContext } from './editor-context';

export interface EditorLoaderProps {
  inputStory: any;
  children?: ReactNode
}

const EditorLoader = ({inputStory, children} : EditorLoaderProps) => {
  const [story, setStory] = useState(inputStory);
  const [blocks, setBlocks ] = useState(inputStory?.blocks || [])
  const value = {story, setStory, blocks, setBlocks};

  return (
    <>
      <EditorContext.Provider value={value}>
        {children}
      </EditorContext.Provider>
    </>
  );
};

export default EditorLoader;
