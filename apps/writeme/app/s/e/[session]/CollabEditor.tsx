'use client';

import { createContext, useEffect, useState } from 'react';
import { BlockNoteContext, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor } from '@blocknote/core';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { randomColor, uploadFile } from 'apps/writeme/services/client-services';
import { useSession } from 'next-auth/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import LoaderSpinner from 'apps/writeme/components/loader-spinner';
import '@blocknote/mantine/style.css';

export const CollabEditorContext = createContext({
  blocks: [],
  setBlocks: (p0: any[]) => {},
});

export interface CollabEditorWrapperProps {
  inputBlocks: any[],
  sessionId: string
}

const CollabEditorWrapper = ({ inputBlocks, sessionId }: CollabEditorWrapperProps) => {
  const [blocks, setBlocks] = useState(inputBlocks);
  //   const [editor, setEditor] = useState<null | BlockNoteEditor>(null);

  const { data } = useSession();

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(`writeme-${sessionId}-live`, ydoc);

  const editor = useCreateBlockNote({
    uploadFile,
    collaboration: {
      provider,
      fragment: ydoc.getXmlFragment('document-store'),
      user: {
        name: data?.user?.name || 'Guest User',
        color: randomColor(),
      },
    },
  });

  if (!editor) {
    return null;
  }
//   editor.replaceBlocks(editor.document, inputBlocks);

  //   useEffect(() => {
  //     const ydoc = new Y.Doc();
  //     const provider = new WebrtcProvider('your-room-name', ydoc);
  //     const editorInstance = BlockNoteEditor.create({
  //       initialContent: inputBlocks,
  //       uploadFile,
  //       collaboration: {
  //         provider,
  //         fragment: ydoc.getXmlFragment('document-store'),
  //         user: {
  //           name: data?.user?.name || 'Guest User',
  //           color: '#fff',
  //         },
  //       },
  //     });
  //     console.log(editor);
  //     setEditor(editorInstance);
  //   }, []);

  const theme = useTheme();

  useEffect(() => {
    console.log("started effect")
    function setDefault() {
        if (!editor){
            console.log("no editor")
            return;
        }

        console.log("current", editor, editor.document.length, blocks);

        if (editor.document.length === 1){
            console.log("setting Default")
            console.log("updating", editor, editor.document.length, blocks);
            editor.insertBlocks(blocks,editor.document[0]);
        }
    }

    if (provider.connected){
        console.log("connected!")
        setDefault();
    }
    provider.on('synced', setDefault);
    return () => provider.off('synced', setDefault)
  },[provider, editor])


  return (
    <CollabEditorContext.Provider value={{ blocks, setBlocks }}>
      {!editor ? (
        <LoaderSpinner />
      ) : (
        <BlockNoteContext.Provider editor={editor}>
          <BlockNoteView
            theme={theme.theme as any}
            onChange={() => {
              setBlocks(editor.document);
            }}
            editor={editor}
          ></BlockNoteView>
        </BlockNoteContext.Provider>
      )}
    </CollabEditorContext.Provider>
  );
};

export default CollabEditorWrapper;
