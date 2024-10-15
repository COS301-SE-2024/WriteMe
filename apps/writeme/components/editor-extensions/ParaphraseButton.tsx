"use client"
import {
  BlockTypeSelectItem,
  useBlockNoteEditor,
  useComponentsContext,
  useDictionary,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getParaphrase } from 'apps/writeme/services/client-services';



// export interface ParaphraseContextItem {

// }

export const ParaphraseContext = createContext({
  paraphrases: [],
  setParaphrases: () => {},
  loading: false,
  setLoading: () => {}
});

export function ParaphraseProvider({children}: {
  children?: ReactNode
}) {
  const [paraphrases, setParaphrases] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    // @ts-ignore
    <ParaphraseContext.Provider value={{paraphrases, setParaphrases, loading, setLoading}}>
      {children}
    </ParaphraseContext.Provider>
  )
}


// Custom Formatting Toolbar Button to toggle blue text & background color.
export function ParaphraseButton(props: { items?: BlockTypeSelectItem }) {
  const editor = useBlockNoteEditor();
  const dict = useDictionary();

  const {paraphrases, setParaphrases, loading, setLoading} = useContext(ParaphraseContext);

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [selectedText, setSelectedText] = useState<string>(editor.getSelectedText());

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setSelectedText(editor.getSelectedText())
  }, editor);

  const [block, setBlock] = useState(editor.getTextCursorPosition().block);

  

  const filteredItems: BlockTypeSelectItem[] = useMemo(() => {
    //@ts-ignore
    return (props.items || allowedBlockTypes(dict)).filter(
      (item) => item.type in editor.schema.blockSchema
    );
  }, [editor, dict, props.items]);

  const shouldShow: boolean = useMemo(
    () => filteredItems.find((item) => item.type === block.type) !== undefined,
    [block.type, filteredItems]
  );

  if (!shouldShow || !editor.isEditable) {
    return null;
  }

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Paraphrase the selected Sentence'}
      onClick={ async () => {
        try {
          //@ts-ignore
          setLoading(true)
          let res = await getParaphrase(selectedText);
          // @ts-ignore
          setParaphrases(res.paraphrases)
          //@ts-ignore
          setLoading(false)
          // console.log(res)
        }catch (e: any){
          //@ts-ignore
          setLoading(false)
        }
      }}
      icon={<Sparkles />}
    >
      <Sparkles/>Paraphrase
    </Components.FormattingToolbar.Button>
  );
}
