'use client';
// import "@blocknote/core/fonts/inter.css";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  DefaultReactSuggestionItem,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  NestBlockButton,
  SuggestionMenuController,
  TextAlignButton,
  UnnestBlockButton,
  useBlockNoteEditor,
  useCreateBlockNote,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { Select } from '@writeme/wmc/lib/ui/select';
import { Button, Card, Input, Label } from '@writeme/wmc';
import { Badge } from '@writeme/wmc/lib/ui/badge';
import { Popover } from '@writeme/wmc/lib/ui/popover';
import { Tooltip } from '@writeme/wmc/lib/ui/tooltip';
import { Toggle } from '@writeme/wmc/lib/ui/toggle';
import { Tabs } from '@writeme/wmc/lib/ui/tabs';
import { DropdownMenu } from '@writeme/wmc/lib/ui/dropdown-menu';
import { Form } from '@writeme/wmc/lib/ui/form';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from '@blocknote/core';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useSession } from 'next-auth/react';

// import { useNextUpload } from 'next-upload/react';

import { upload } from 'next-upload/client';
import { Sparkles } from 'lucide-react';
import { ParaphraseButton } from '../../../../apps/writeme/components/editor-extensions/ParaphraseButton';
import { SuggestionButton } from '../../../../apps/writeme/components/editor-extensions/SuggestionButton';
import { EntityButton } from '../../../../apps/writeme/components/editor-extensions/EntityButton';
import  { GrammarButton} from '../../../../apps/writeme/components/editor-extensions/GrammarButton';
// Our <Editor> component we can reuse later

export interface EditorProps {
  initialBlocks: any;
  setBlocks: any;
}

const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: 'AI rewrite humourously',
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, 'after');
  },
  aliases: ['helloworld', 'hw'],
  group: 'AI',
  icon: <Sparkles></Sparkles>,
  subtext: "Used to insert a block with 'Hello World' below.",
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];

export default function Editor({ initialBlocks, setBlocks }: EditorProps) {
  const { data } = useSession();
  // const {upload, files, signedPostPolicies} = useNextUpload();
  // console.log(initialBlocks);
  // const [blocks, setBlocks] = useState(initialBlocks);

  // async function uploadFile(file: File){
  //   const res = await upload({file}, {
  //     api: "/upload"
  //   })
  //   console.log(res)

  //   const url = res[0].url +"/" + res[0].data.key;
  //   console.log(url)
  //   return url;
  // }

  // Creates a new editor instance.
  // const editor = useCreateBlockNote({ });
  // const editor = useMemo(() => {
  //   // const doc = new Y.Doc();
  //   // doc.
  //   // const provider = new WebrtcProvider('testing-writeme-chapter12', doc);

  //   // console.log(initialBlocks);
  //   // console.log(initialBlocks.length)
  //   if (initialBlocks.length === 0 || initialBlocks.length == undefined) {
  //     return BlockNoteEditor.create({
  //       uploadFile: uploadFile
  //     });
  //   }
  //   return BlockNoteEditor.create({ initialContent: initialBlocks,
  //     uploadFile: uploadFile
  //   //   collaboration: {
  //   //   provider,
  //   //   fragment: doc.getXmlFragment('document-store'),
  //   //   user: {
  //   //     name: data?.user?.name || "anon",
  //   //     color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
  //   //   }
  //   // }
  // });
  // }, []);

  const theme = useTheme();
  const editor = useBlockNoteEditor();

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={theme.theme as any}
      slashMenu={false}
      formattingToolbar={false}
      onChange={() => {
        // Saves the document JSON to state.
        // console.log(editor.document)
        setBlocks(editor.document);
      }}
      shadCNComponents={{
        Select,
        Card,
        Badge,
        Input,
        Label,
        Popover,
        Tooltip,
        Toggle,
        Tabs,
        Button,
        DropdownMenu,
        Form,
      }}
    >
      <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) => {
          return filterSuggestionItems(getCustomSlashMenuItems(editor), query);
        }}
      ></SuggestionMenuController>

      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BlockTypeSelect key={'blockTypeSelect'} />

            <FileCaptionButton key={'fileCaptionButton'} />
            <FileReplaceButton key={'replaceFileButton'} />

            <BasicTextStyleButton
              basicTextStyle={'bold'}
              key={'boldStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'italic'}
              key={'italicStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'underline'}
              key={'underlineStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'strike'}
              key={'strikeStyleButton'}
            />
            <ParaphraseButton key={'paraphrase'} />
            <SuggestionButton key={'suggest'} />
            <GrammarButton key={'grammar'}/>
            <EntityButton key={'entity'}/>
            {/* Extra button to toggle code styles */}
            {/* <BasicTextStyleButton
              key={'codeStyleButton'}
              basicTextStyle={'code'}
            /> */}

            <TextAlignButton
              textAlignment={'left'}
              key={'textAlignLeftButton'}
            />
            <TextAlignButton
              textAlignment={'center'}
              key={'textAlignCenterButton'}
            />
            <TextAlignButton
              textAlignment={'right'}
              key={'textAlignRightButton'}
            />

            <ColorStyleButton key={'colorStyleButton'} />

            <NestBlockButton key={'nestBlockButton'} />
            <UnnestBlockButton key={'unnestBlockButton'} />

            <CreateLinkButton key={'createLinkButton'} />

            
          </FormattingToolbar>
        )}
      />
    </BlockNoteView>
  );
}
