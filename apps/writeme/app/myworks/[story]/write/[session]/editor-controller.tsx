"use client";


import React, { createContext, useState } from 'react';
import Editor from '@writeme/wmc/lib/ui/editor';


const EditorContext = createContext({});


export interface EditorControllerProps {
  initialBlocks: any

}
const EditorController = ({initialBlocks}:EditorControllerProps) => {
  const [blocks, setBlocks] = useState(initialBlocks);



  return (
    <div>
      <Editor initialBlocks={blocks} setBlocks={setBlocks} ></Editor>
    </div>
  );
};

export default EditorController;
