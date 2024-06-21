import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import React from 'react';
import { getPublishedStory } from '../../../services/stories';

import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import Book from '../../../assets/HarryPotter.png';
import { Button, buttonVariants } from '@writeme/wmc';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc';
import { Bookmark, BookOpenText, Pencil } from 'lucide-react';
import { Share } from 'lucide-react';
import { Download } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { getPublishedStory, getStory } from '../../../services/stories';
import { Avatar, AvatarFallback, AvatarImage } from '@writeme/wmc/lib/ui/avatar';
import { Link } from 'next-view-transitions'
// import Link from 'next/link';


/* eslint-disable-next-line */
export interface StoryProps {
  params: {
    story: string;
  };
}

export default async function Story(props: StoryProps) {
  const story = await getPublishedStory(props.params.story);

  return (
    <div>
      <LocalNavbar></LocalNavbar>
      {/* <div className="flex justify-center py-4  flex-col items-center">
        <div className="flex flex-col items-center max-w-[70ch]">

        <h1 className="text-4xl">{story.title}</h1>

        <div className="flex flex-col gap-1 text-lg" dangerouslySetInnerHTML={{__html: story.content}}>

        </div>
        </div>

      </div> */}
             <div className="flex flex-col items-center justify-center gap-10">

       <div className='flex justify-center mt-4 gap-x-8'>
         <div className="relative aspect-[3/4] h-60 m-8">
          <img
            style={{
              objectFit: 'contain'
            }}
            src={story.cover}
            alt="Book Image"
            objectFit="contain"
          />
        </div>
        <div className='flex flex-col justify-between'>
          <h1 className='font-bold text-4xl'>{story.title}</h1>

          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={story.author.image} alt={story.author.name}></AvatarImage>
              <AvatarFallback>{story.author.name[0]}</AvatarFallback>
            </Avatar>
            <Link href={`/user/${story.author.id}`}>{story.author.name}</Link>
          </div>

          <p className='italic text-sm'>{story.brief}</p>

          {/*<Button>Start reading <ArrowUpRight></ArrowUpRight></Button>*/}
          <div className="flex gap-4">

          <Button asChild variant="default">
            <Link href={`/myworks/${story.id}/write/`}><div className="flex gap-1 items-center"><Pencil size='1rem' /> Write</div></Link>
          </Button>
          <Button asChild variant="default">
            <Link href={`/stories/${story.id}`}><div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div></Link>
          </Button>
          </div>

        </div>
      </div>

      <div className="flex justify-center items-center h-full"> {/* Centering container for the card */}
        <Card className="w-full">
          <CardHeader>
            { story.description ?
            <CardTitle>Description</CardTitle> : <></> }
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-full w-full"> {/* Centering container for card content */}
              <div>
                <p>{story.description}</p>
              </div>
            </div>

            <div className="flex flex-col">
                {story.chapters.map(chapter => {
                  return (
                     <div key={chapter.id} className="flex">
                       <p>{chapter.title}</p>
                     </div>
                  )
                })}
            </div>

          </CardContent>
          <CardFooter>
            <div className="flex justify-center items-center h-full space-x-4"> {/* Centering container for card footer */}
              <Bookmark></Bookmark>
              <Share></Share>
              <Download></Download>
            </div>
          </CardFooter>
        </Card>
      </div>
      </div>
    </div>
  );
}
