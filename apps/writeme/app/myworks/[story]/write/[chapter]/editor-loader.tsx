'use client';

import React, { useState, ReactNode, useMemo, useEffect } from 'react';
import { EditorContext } from './editor-context';
import { BlockNoteContext, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import { uploadFile } from 'apps/writeme/services/client-services';
import { ParaphraseProvider } from 'apps/writeme/components/editor-extensions/ParaphraseButton';
import { SuggestionProvider } from 'apps/writeme/components/editor-extensions/SuggestionButton';
import { GrammarProvider } from 'apps/writeme/components/editor-extensions/GrammarButton';
import { EnitityProvider } from 'apps/writeme/components/editor-extensions/EntityButton';
import { IndexeddbPersistence } from 'y-indexeddb';
import * as Y from 'yjs';
import { Loader } from 'lucide-react';

export interface EditorLoaderProps {
  inputChapter: any;
  children?: ReactNode;
}

const EditorLoader = ({ inputChapter, children }: EditorLoaderProps) => {
  const [chapter, setChapter] = useState(inputChapter);
  const [blocks, setBlocks] = useState(inputChapter?.blocks || []);
  const value = { chapter, setChapter, blocks, setBlocks };

  const ydoc = new Y.Doc();

  //   // Set up IndexedDB persistence
  const persistence = new IndexeddbPersistence(chapter.id, ydoc);
  const editor = useCreateBlockNote({
    uploadFile,
    collaboration: {
      provider: persistence,
      fragment: ydoc.getXmlFragment('document-store'),
      user: {
        name: 'Me',
        color: '#ff0000',
      },
    },
  });

  if (!editor){
    return null
  }

  useEffect(() => {
    function setDefault(){
      if (!editor){
        console.log("no editor")
        return;
      }
      if (editor.document.length == 0){
        editor.insertBlocks(inputChapter?.blocks || [], editor.document[0])
      }else {
        setBlocks(editor.document);
      }
    }
    if (persistence.synced){
      setDefault();
    }
    persistence.on('synced', setDefault);
    return () => persistence.off('synced', setDefault)
  }, []);


  return (
    <>
      <EditorContext.Provider value={value}>
        {!editor ? (
          <Loader />
        ) : (
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
        )}
      </EditorContext.Provider>
    </>
  );
};

export default EditorLoader;
