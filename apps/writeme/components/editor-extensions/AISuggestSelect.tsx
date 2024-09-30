'use client';

import {
  BlockSchema,
  Dictionary,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import {
  BlockTypeSelectItem,
  useBlockNoteEditor,
  useComponentsContext,
  useDictionary,
  useEditorContentOrSelectionChange,
  useSelectedBlocks,
} from '@blocknote/react';
import { useMemo, useState } from 'react';

const allowedBlockTypes = (dict: Dictionary): BlockTypeSelectItem[] => [
  {
    name: dict.slash_menu.paragraph.title,
    type: 'paragraph',
    icon: (<></>) as any,
    isSelected: (block) => block.type === 'paragraph',
  },
  {
    name: dict.slash_menu.heading.title,
    type: 'heading',
    props: { level: 1 },
    icon: (<></>) as any,
    isSelected: (block) =>
      block.type === 'heading' &&
      'level' in block.props &&
      block.props.level === 1,
  },
  {
    name: dict.slash_menu.heading_2.title,
    type: 'heading',
    props: { level: 2 },
    icon: (<></>) as any,
    isSelected: (block) =>
      block.type === 'heading' &&
      'level' in block.props &&
      block.props.level === 2,
  },
  {
    name: dict.slash_menu.heading_3.title,
    type: 'heading',
    props: { level: 3 },
    icon: (<></>) as any,
    isSelected: (block) =>
      block.type === 'heading' &&
      'level' in block.props &&
      block.props.level === 3,
  },
];

function AISuggestSelect(props: { items?: BlockTypeSelectItem }) {
  const Components = useComponentsContext();
  const dict = useDictionary();

  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  const selectedBlocks = useSelectedBlocks(editor);

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

  useEditorContentOrSelectionChange(() => {
    setBlock(editor.getTextCursorPosition().block);
  }, editor);

  if (!shouldShow || !editor.isEditable) {
    return null;
  }


  return <div>AISuggestSelect</div>;
}

export default AISuggestSelect;
