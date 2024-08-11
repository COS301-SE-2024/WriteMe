"use client";


import React, { createContext, useContext, useEffect, useState } from 'react';
import Editor from '@writeme/wmc/lib/ui/editor';
import { EditorContext } from './editor-context';
import { useBlockNoteEditor } from '@blocknote/react';

let interval: any;

const EditorController = () => {
  const { story, setStory, blocks, setBlocks } = useContext(EditorContext);

  // const editor = useBlockNoteEditor()

  // // autosave every 30 mins
  // useEffect(() => {

  // })

  // const autoSave = () => {
  //   interval = setInterval(() => {

  //   }, 6000)
  // }


  return (
    <div>
      <Editor initialBlocks={blocks} setBlocks={setBlocks} ></Editor>
    </div>
  );
};

export default EditorController;
