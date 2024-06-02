"use client";

import { createContext } from 'react';

export const EditorContext = createContext({
  story: {},
  setStory: () => {},
  blocks: [],
  setBlocks: () => {}
});



