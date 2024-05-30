/* eslint-disable-next-line */
import { Separator } from '@writeme/wmc/lib/ui/separator';
import dynamic from "next/dynamic";
import { Button } from '@writeme/wmc';
import { ArrowLeft } from 'lucide-react';
import { CardStack } from '@writeme/wmc/lib/ui/card-stack';
import { cn } from '@writeme/wmc/utils';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@writeme/wmc/lib/ui/resizable';
import { db } from '../../../../../db/db';
import { stories } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';

const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });

export const Highlight = ({
                            children,
                            className,
                          }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];

export interface WriteProps {
  params: {
    story: string,
    session: string
  }
}


async function getStory(id: string){
  const result = db.query.stories.findFirst({
    where: (stories, {eq}) => eq(stories.id, id),
  })
  return result;
}



export default async function Write(props: WriteProps) {
  const story = await getStory(props.params.story);


  return (
    <div className="h-screen">
      <nav className="h-16 flex p-2 items-center justify-between ">
        <div className="flex items-center gap-4">
          <Button variant='secondary' ><ArrowLeft></ArrowLeft></Button>
          <h2>{story.title}</h2>
        </div>

        <div className="flex gap-2">
          <Button variant='default'> Preview </Button>
          <Button variant='default'> Save </Button>
          <Button variant='default'> Publish </Button>
        </div>


      </nav>

      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={75}>
          <div className="grow p-8 flex justify-center">
            <div className="w-[90ch]">
              <Editor></Editor>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel defaultSize={25}>
          <div className="px-4">
            <div className="flex-col flex gap-10">
              <div className="flex flex-col gap-4">
                <h3>Characters</h3>
                <Separator orientation='horizontal' className='mb-4'></Separator>
                <CardStack items={CARDS}></CardStack>
              </div>
              {/*<Separator orientation="horizontal"></Separator>*/}

              <div className="flex flex-col gap-4">
                <h3>Suggestions</h3>
                <Separator orientation="horizontal" className="mb-4"></Separator>
                <CardStack items={CARDS}></CardStack>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>


    </div>
  );
}
