/* eslint-disable-next-line */
import dynamic from "next/dynamic";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@writeme/wmc/lib/ui/resizable';
import { ScrollArea} from "@writeme/wmc/lib/ui/scroll-area"
import { db } from '../../../../../db/db';
import LocalNavbar from './local-navbar';

// import EditorLoader from ;
// import EditorController from './editor-controller';
import EditorUtils from './editor-utilities';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
import { notFound } from "next/navigation";

const EditorController = dynamic(() => import("./editor-controller"), {ssr: false});
const EditorLoader = dynamic(() => import("./editor-loader"), { ssr: false });


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

  if (!chapter) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <EditorLoader inputChapter={chapter}>

      <LocalNavbar />
      <div className='z-1 relative'>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={75}>
            <div className="grow p-2 md:p-8 flex justify-center" id="editor-main-panel">
              <div className="w-[90ch]">
                <EditorController></EditorController>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle></ResizableHandle>
          <ResizablePanel defaultSize={25}>
            <div className="px-4 top-0 sticky flex flex-wrap" id="editor-tools-panel">
              <ScrollArea className='h-full'>
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
