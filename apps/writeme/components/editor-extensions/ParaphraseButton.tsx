"use client"
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { createContext, ReactNode, useContext, useState } from 'react';
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
export function ParaphraseButton() {
  const editor = useBlockNoteEditor();

  const {paraphrases, setParaphrases, loading, setLoading} = useContext(ParaphraseContext);

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [selectedText, setSelectedText] = useState<string>(editor.getSelectedText());

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setSelectedText(editor.getSelectedText())
  }, editor);

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
      <Sparkles/>AI
    </Components.FormattingToolbar.Button>
  );
}
