"use client"
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { getSuggestions } from 'apps/writeme/services/client-services';


export const SuggestionContext = createContext({
  suggestions: [],
  setSuggestions: () => {},
  loading: false,
  setLoading: () => {}
});

export function SuggestionProvider({children}: {
  children?: ReactNode
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    // @ts-ignore
    <SuggestionContext.Provider value={{suggestions, setSuggestions, loading, setLoading}}>
      {children}
    </SuggestionContext.Provider>
  )
}


// Custom Formatting Toolbar Button to toggle blue text & background color.
export function SuggestionButton() {
  const editor = useBlockNoteEditor();

  const {suggestions, setSuggestions, loading, setLoading} = useContext(SuggestionContext);

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [selectedText, setSelectedText] = useState<string>(editor.getSelectedText());

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setSelectedText(editor.getSelectedText())
  }, editor);

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Complete the selected sentence.'}
      onClick={ async () => {
        try {
          //@ts-ignore
          setLoading(true)
          let res = await getSuggestions(selectedText);
          // @ts-ignore
          setSuggestions(res.options)
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
