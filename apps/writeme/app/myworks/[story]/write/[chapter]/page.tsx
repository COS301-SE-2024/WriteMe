/* eslint-disable-next-line */
import { Separator } from '@writeme/wmc/lib/ui/separator';
import dynamic from "next/dynamic";
import { Button, Card, CardHeader, CardContent, CardFooter, CardTitle } from '@writeme/wmc';
import { ArrowLeft } from 'lucide-react';
import { CardStack } from '@writeme/wmc/lib/ui/card-stack';
import { cn } from '@writeme/wmc/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@writeme/wmc/lib/ui/resizable';
import { ScrollArea} from "@writeme/wmc/lib/ui/scroll-area"
import { db } from '../../../../../db/db';
import { stories } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import EditorController from './editor-controller';
import LocalNavbar from './local-navbar';
import { EditorContext } from './editor-context';
import EditorLoader from './editor-loader';
import { Textarea } from '@writeme/wmc/lib/ui/textarea';
import { ImprovGameDialog } from 'apps/writeme/components/improv-game';
import PromptPad from './prompt-pad';
import EditorUtils from './editor-utilities';

const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });


export interface WriteProps {
  params: {
    story: string,
    chapter: string
  }
}


async function getStory(id: string){
  const result = db.query.stories.findFirst({
    where: (stories, {eq}) => eq(stories.id, id),
  })
  return result;
}

async function getChapter(id: string){
  const result = db.query.chapters.findFirst({
    where: (chapters, {eq}) => eq(chapters.id, id),
  })
  return result;
}



export default async function Write(props: WriteProps) {
  // const story = await getStory(props.params.story);
  const chapter = await getChapter(props.params.chapter)

  return (
    <div className="min-h-screen">
      <EditorLoader inputChapter={chapter}>

      <LocalNavbar />

      <div className='z-1 relative'>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={75}>
            <div className="grow p-8 flex justify-center" id="editor-main-panel">
              <div className="w-[90ch]">
                <EditorController initialBlocks={chapter.blocks}></EditorController>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle></ResizableHandle>
          <ResizablePanel defaultSize={25}>
            <div className="px-4 top-0 sticky" id="editor-tools-panel">
              <ScrollArea>
                <EditorUtils></EditorUtils>
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      </EditorLoader>

    </div>
  );
}
