"use client";


import React, { createContext, useContext, useState } from 'react';
import Editor from '@writeme/wmc/lib/ui/editor';
import { EditorContext } from './editor-context';



const EditorController = () => {
  const { story, setStory, blocks, setBlocks } = useContext(EditorContext);

  return (
    <div>
      <Editor initialBlocks={blocks} setBlocks={setBlocks} ></Editor>
    </div>
  );
};

export default EditorController;
