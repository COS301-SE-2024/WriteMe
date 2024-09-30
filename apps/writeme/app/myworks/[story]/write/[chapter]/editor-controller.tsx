"use client";

import dynamic from 'next/dynamic';
import React, { createContext, useContext, useEffect, useState } from 'react';
const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });
import { EditorContext } from './editor-context';
import { useBlockNoteEditor } from '@blocknote/react';

const EditorController = () => {
  return (
    <div>
      <Editor ></Editor>
    </div>
  );
};

export default EditorController;
