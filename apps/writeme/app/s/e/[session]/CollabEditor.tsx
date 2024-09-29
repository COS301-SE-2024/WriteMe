'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BlockNoteContext, useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor, Block } from '@blocknote/core';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { randomColor, uploadFile } from 'apps/writeme/services/client-services';
import { useSession } from 'next-auth/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useTheme } from 'next-themes';
import LoaderSpinner from 'apps/writeme/components/loader-spinner';
import '@blocknote/mantine/style.css';
import YPartyKitProvider from 'y-partykit/provider';
import { Button } from '@writeme/wmc';
import {toast} from "@writeme/wmc/lib/ui/use-toast";

export const CollabEditorContext = createContext({
  blocks: [],
  setBlocks: (p0: any[]) => {},
});

export interface CollabEditorWrapperProps {
  inputBlocks: any[],
  sessionId: string,
  chapterId: string,
  owner: boolean,
  chapter: any
}

const CollabEditorWrapper = ({ inputBlocks, sessionId, chapterId, owner, chapter }: CollabEditorWrapperProps) => {
  const [blocks, setBlocks] = useState(inputBlocks);
  const [doc, setDoc] = useState<Y.Doc>()
  const [provider , setProvider] =useState<YPartyKitProvider>()
  const { data } = useSession();

  useEffect(() => {
    const yDoc = new Y.Doc();

    const yProvider = new YPartyKitProvider(process.env.NEXT_PUBLIC_PARTYKIT_HOST, `writeme-${sessionId}-live`, yDoc)
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    }
  }, [sessionId]);

  if (!doc || !provider){
    return null;
  }

  return (
    <CollabEditorContext.Provider value={{ blocks, setBlocks }}>
      <BlockNoteCollab doc={doc} provider={provider} blocks={inputBlocks} chapterId={chapterId} inputBlocks={inputBlocks} owner={owner} chapter={chapter}/>
    </CollabEditorContext.Provider>
  );
};

type EditorProps = {
  doc: Y.Doc;
  provider: YPartyKitProvider;
  inputBlocks: Block[];
  chapterId: string;
  chapter:any;
  owner: boolean;
};
export function BlockNoteCollab({ doc, provider, inputBlocks, chapterId, owner, chapter }: EditorProps) {

  const {data} = useSession();
  const theme = useTheme();
  const {setBlocks, blocks} = useContext(CollabEditorContext);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);



  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information for this user:
      user: {
        name: data?.user?.name || "Guest User",
        color: randomColor(),
      },
    },
  });

  // Set default state if you wish
  useEffect(() => {
    function setDefault() {
      console.log("set default called")
      if (!editor) {
        return;
      }

      if (editor.document.length === 1 || editor.document.length === 0) {
        console.log("updating")
        editor.insertBlocks(
          inputBlocks,
          editor.document[0]
        );
      }
    }

    if (provider.synced) {
      setDefault();
    }

    provider.on("synced", setDefault);
    provider.on('peers', peers => {
      console.log(peers)
      if (peers.bcPeers.length ===1 && peers.removed.length === 0){
        setDefault();
      }
    })
    return () => provider.off("synced", setDefault);
  }, [provider, editor]);

  const onSave = async (e) => {
    setError(false);
    console.log(blocks);
    e.preventDefault();
    const values = {
      ...chapter,
      blocks:blocks
    }


    try {
      setSubmitting(true);
      const res = await fetch('/api/chapter', {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast({
              title: error.message,
              variant: 'destructive'
            })
          });

          return;
        }

        toast({
          title: errorData.message,
          variant: 'destructive'
        })
        return;
      }
      toast({
        title: 'Saved Successfully',
        variant: "default"
      })

    } catch (error: any) {
      setError(true);
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div>
      {owner ? <Button onClick={onSave}>Save</Button> : <></>}
      <BlockNoteView
        editor={editor}
        theme={theme.theme as any}
        onChange={() => {
          setBlocks(editor.document);
        }}
      />
    </div>
  );
}

export default CollabEditorWrapper;
