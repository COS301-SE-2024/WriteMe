"use client"
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { createContext, ReactNode, useContext, useState } from 'react';
import { BookCheck, BookOpen, Sparkles } from 'lucide-react';
import { getEntities } from 'apps/writeme/services/client-services';


export const EntityContext = createContext({
  entities: [],
  setEntities: () => {},
  loading: false,
  setLoading: () => {}
});

export function EnitityProvider({children}: {
  children?: ReactNode
}) {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    // @ts-ignore
    <EntityContext.Provider value={{entities, setEntities, loading, setLoading}}>
      {children}
    </EntityContext.Provider>
  )
}


// Custom Formatting Toolbar Button to toggle blue text & background color.
export function EntityButton() {
  const editor = useBlockNoteEditor();

  const {entities, setEntities, loading, setLoading} = useContext(EntityContext);

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [selectedText, setSelectedText] = useState<string>(editor.getSelectedText());

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setSelectedText(editor.getSelectedText())
  }, editor);

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Detect Sentiment, Entities and Parts of Speach within text.'}
      onClick={ async () => {
        try {
          //@ts-ignore
          setLoading(true)
          let res = await getEntities(selectedText);
          // @ts-ignore
          setEntities(res.analysis)
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
      <BookOpen/>Analysis
    </Components.FormattingToolbar.Button>
  );
}
