"use client"
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { createContext, ReactNode, useContext, useState } from 'react';
import { BookCheck, Sparkles } from 'lucide-react';
import { getEntities, getGrammar } from 'apps/writeme/services/client-services';


export const GrammarContext = createContext({
  corrected: "",
  setCorrected: () => {},
  entities: [],
  setEntities: () => {},
  loading: false,
  setLoading: () => {}
});

export function GrammarProvider({children}: {
  children?: ReactNode
}) {
    const [corrected, setCorrected] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    // @ts-ignore
    <GrammarContext.Provider value={{ corrected, setCorrected, entities, setEntities, loading, setLoading}}>
      {children}
    </GrammarContext.Provider>
  )
}


// Custom Formatting Toolbar Button to toggle blue text & background color.
export function GrammarButton() {
  const editor = useBlockNoteEditor();

  const {corrected, setCorrected, entities, setEntities, loading, setLoading} = useContext(GrammarContext);

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [selectedText, setSelectedText] = useState<string>(editor.getSelectedText());

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setSelectedText(editor.getSelectedText())
  }, editor);

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Grammar Check'}
      onClick={ async () => {
        try {
          //@ts-ignore
          setLoading(true)
          let res = await getGrammar(selectedText);
          // @ts-ignore
          setEntities(res.edits)
          // @ts-ignore
          setCorrected(res.result)
          //@ts-ignore
          setLoading(false)
          // console.log(res)
        }catch (e: any){
          //@ts-ignore
          setLoading(false)
        }
      }}
      icon={<BookCheck />}
    >
      <Sparkles/>Grammar
    </Components.FormattingToolbar.Button>
  );
}
