"use client";

import { createContext } from 'react';

export const EditorContext = createContext({
  chapter: {},
  setChapter: () => {},
  blocks: [],
  setBlocks: () => {}
});



