'use client';

import React, { useState, ReactNode, useMemo } from 'react';
import { EditorContext } from './editor-context';
import { BlockNoteContext } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import { uploadFile } from 'apps/writeme/services/client-services';
import { ParaphraseProvider } from 'apps/writeme/components/editor-extensions/ParaphraseButton';
import { SuggestionProvider } from 'apps/writeme/components/editor-extensions/SuggestionButton';
import { GrammarProvider } from 'apps/writeme/components/editor-extensions/GrammarButton';
import { EnitityProvider } from 'apps/writeme/components/editor-extensions/EntityButton';

export interface EditorLoaderProps {
  inputChapter: any;
  children?: ReactNode;
}

const EditorLoader = ({ inputChapter, children }: EditorLoaderProps) => {
  const [chapter, setChapter] = useState(inputChapter);
  const [blocks, setBlocks] = useState(inputChapter?.blocks || []);
  const value = { chapter, setChapter, blocks, setBlocks };
  const editor = useMemo(() => {
    if (blocks.length === 0 || blocks.length == undefined) {
      return BlockNoteEditor.create({
        uploadFile: uploadFile,
      });
    }
    return BlockNoteEditor.create({
      initialContent: blocks,
      uploadFile: uploadFile,
    });
  }, []);

  return (
    <>
      <EditorContext.Provider value={value}>
        <BlockNoteContext.Provider
          value={{
            editor,
          }}
        >
          <SuggestionProvider>
            <ParaphraseProvider>
              <GrammarProvider>
                <EnitityProvider>{children}</EnitityProvider>
              </GrammarProvider>
            </ParaphraseProvider>
          </SuggestionProvider>
        </BlockNoteContext.Provider>
      </EditorContext.Provider>
    </>
  );
};

export default EditorLoader;
