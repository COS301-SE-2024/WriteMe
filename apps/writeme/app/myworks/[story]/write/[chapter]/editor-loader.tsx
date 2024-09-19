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
  // const [editor, setEditor] = useState<null | BlockNoteEditor>(null);

  // useEffect(() => {
  //   // Initialize Yjs document
  //   const ydoc = new Y.Doc();

  //   // Set up IndexedDB persistence
  //   const persistence = new IndexeddbPersistence(chapter.id, ydoc);

  //   const editorInstance = BlockNoteEditor.create({
  //     initialContent: inputChapter?.blocks || [],
  //     uploadFile,
  //     collaboration: {
  //       provider: persistence,
  //       fragment: ydoc.getXmlFragment('document-store'),
  //       user: {
  //         name: 'Me',
  //         color: "#ff0000"
  //       }
  //     }
  //   })

  //   setEditor(editorInstance);
  //   }, []);

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
      console.log("set default called")
      if (!editor){
        console.log("no editor")
        return;
      }
      if (editor.document.length === 1 || editor.document.length == 2 || editor.document.length == 0){
        console.log("updating", editor, editor.document.length, blocks);
        editor.insertBlocks(inputChapter?.blocks || [], editor.document[0])
      }
    }

    if (persistence.synced){
      console.log("syned")
      setDefault();
    }
    persistence.on('synced', setDefault);
    return () => persistence.off('synced', setDefault)
  }, [persistence, editor]);


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
