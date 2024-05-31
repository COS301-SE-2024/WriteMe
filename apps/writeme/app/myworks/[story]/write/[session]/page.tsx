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
import Link from 'next/link';
import EditorController from './editor-controller';
import LocalNavbar from './local-navbar';

const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });

const Highlight = ({
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
    name: "",
    designation: "",
    content: (
      <p>
        <Highlight>Thorin is a towering dwarf</Highlight> with a broad, sturdy frame, braided black hair, and a thick beard adorned with metal beads. He wears heavy, ornate armor that shows signs of frequent use.
      </p>
    ),
  },
  {
    id: 1,
    name: "",
    designation: "",
    content: (
      <p>
        <Highlight> Elysia is a graceful</Highlight>, ethereal human with long, flowing blonde hair and bright blue eyes. She often wears light, flowing dresses that allow for easy movement.
      </p>
    ),
  },
  {
    id: 2,
    name: "",
    designation: "",
    content: (
      <p>
        A traveling bard with a mysterious past, <Highlight> Elysia </Highlight>captivates audiences with her enchanting voice and magical melodies. She seeks to spread joy and uncover lost stories.
      </p>
    ),
  },
];


const CHARACTERS = [
  {
    id: 0,
    name: "Lirael Dawnstar",
    designation: "Elven",
    content: (
      <p>
        Raised in the secluded forests of Elaria, Lirael is a skilled healer and a guardian of ancient knowledge. She is well-versed in herbalism and ancient magic, often sought after for her wisdom.
      </p>
    ),
  },
  {
    id: 1,
    name: "Gregor Thorne",
    designation: "Mercenary",
    content: (
      <p>
        A former soldier turned mercenary, Gregor has seen countless battles. He now works as a freelance protector, offering his services to those in need of a <Highlight>skilled warrior</Highlight>.
      </p>
    ),
  },
  {
    id: 2,
    name: "Mira Solara",
    designation: "Pick pocket",
    content: (
      <p>
        Mira grew up in a bustling trade town, where she learned the art of thievery and espionage. Now, she travels the world as a <Highlight> spy for hire</Highlight>, gathering information and artifacts.
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
    <div className="min-h-screen">
      <LocalNavbar title={story.title} />

      <div className='z-1 relative'>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={75}>
            <div className="grow p-8 flex justify-center">
              <div className="w-[90ch]">
                <EditorController initialBlocks={story.blocks}></EditorController>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle></ResizableHandle>
          <ResizablePanel defaultSize={25}>
            <div className="px-4 top-0 sticky">
              <div className="flex-col flex gap-10">
                <div className="flex flex-col gap-4">
                  <h3>Characters</h3>
                  <Separator orientation='horizontal' className='mb-4'></Separator>
                  <CardStack items={CHARACTERS}></CardStack>
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


    </div>
  );
}
