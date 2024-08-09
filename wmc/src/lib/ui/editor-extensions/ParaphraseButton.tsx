"use client"
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

// Custom Formatting Toolbar Button to toggle blue text & background color.
export function ParaphraseButton() {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === 'blue' &&
      editor.getActiveStyles().backgroundColor === 'blue'
  );

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().textColor === 'blue' &&
        editor.getActiveStyles().backgroundColor === 'blue'
    );
  }, editor);

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Paraphrase the selected Sentence'}
      onClick={() => {
        editor.toggleStyles({
          textColor: 'blue',
          backgroundColor: 'blue',
        });
      }}
      icon={<Sparkles />}
      isSelected={isSelected}
    >
      <Sparkles/>AI
    </Components.FormattingToolbar.Button>
  );
}
