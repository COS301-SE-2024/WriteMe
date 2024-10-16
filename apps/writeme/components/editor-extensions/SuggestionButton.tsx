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
export function SuggestionButton(props: { items?: BlockTypeSelectItem }) {
  const editor = useBlockNoteEditor();
  const dict = useDictionary();
  
  const {suggestions, setSuggestions, loading, setLoading} = useContext(SuggestionContext);

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
      <Sparkles/>Suggest
    </Components.FormattingToolbar.Button>
  );
}
