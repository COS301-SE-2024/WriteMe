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
import { BookCheck, BookOpen, Sparkles } from 'lucide-react';
import { getEntities } from 'apps/writeme/services/client-services';
import { allowedBlockTypes } from './AISuggestSelect';

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
export function EntityButton(props: { items?: BlockTypeSelectItem }) {
  const editor = useBlockNoteEditor();
  const dict = useDictionary();

  const {entities, setEntities, loading, setLoading} = useContext(EntityContext);

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
