import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from 'apps/writeme/services/users';
import { getStoryWriteathons, getVoteCategories, getWriteathon } from 'apps/writeme/services/writeathons';
import React from 'react';
import BookCover from '../../../assets/temp-cover2.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';
import Link from 'next/link';
import {notFound} from 'next/navigation'
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@writeme/wmc/lib/ui/dropdown-menu"
import { getUserStories } from 'apps/writeme/services/stories';
import StorySelector from 'apps/writeme/components/story-selector';
import { auth } from 'apps/writeme/auth';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Card, CardDescription, CardHeader, CardTitle } from '@writeme/wmc/lib/ui/card';
import { cn } from '@writeme/wmc/utils';
import { ArrowBigUp, BookOpenText } from 'lucide-react';
import VoteButton from 'apps/writeme/components/vote-button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
import WriteathonImageUpload from "./edit/image-upload"
import { redirect } from 'next/navigation'

export interface WriteathonProps {
  params: {
    writeathon: string
  }
}

dayjs.extend(relativeTime);

export const Writeathon = async (props: WriteathonProps) => {
  const session = await auth()

  if (!session?.user){
    redirect("/auth/login");
  }

  const currWriteathon = await getWriteathon(props.params.writeathon)

  if (!currWriteathon){
    notFound();
  }

  const creator = await getUser(currWriteathon?.userId!)
  const stories = await getUserStories(session?.user?.id!)
  const storyWriteathons = await getStoryWriteathons(currWriteathon?.id!)
  const categories = await getVoteCategories()

  const current_date = new Date();
  // console.log(current_date, new Date(currWriteathon.startDate))
  const started = current_date > new  Date(currWriteathon.startDate);

  return (
    <div className="flex flex-col h-screen">
      <LocalNavbar />
      <div className="flex flex-row w-full relative">
        <div className="flex flex-col items-start p-10 w-1/3 gap-4 border-b-[1px] border-r-[1px]">
          <h1 className='text-3xl font-bold'>{currWriteathon?.title}</h1>
          {creator?.id === session?.user?.id! ? <WriteathonImageUpload writeathon={currWriteathon} /> :
            <div className="relative aspect-[3/4] h-60">
              <img
                alt="Writeathon Cover"
                src={currWriteathon?.cover || BookCover}
              />
            </div>}

          <p className="italic text-sm">{currWriteathon?.description}</p>
          <div className="pt-4 grid grid-cols-1">
            <h1>Start Date:&nbsp; <span className='font-bold'>{format(currWriteathon?.startDate as Date, "PPP")}</span></h1>
            <h1>End Date:&nbsp; <span className='font-bold'>{format(currWriteathon?.endDate as Date, "PPP")}</span></h1>
          </div>
          <Button className='p-0' asChild variant="link">
            <Link href={`/user/${creator?.id}`}>{creator?.name}</Link>
          </Button>

        </div>
        {started ?
        <div className="flex flex-col p-10 w-2/3">
            <h1 className='text-2xl font-bold mb-6'>Entered Stories</h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Enter a story</Button>
                <p>{storyWriteathons.length == 0 ? 'No stories have been entered in this Writeathon yet, be the first to show your creativity!' : ''}</p>
              </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Stories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {stories.map((story, i) => (
                    <StorySelector story={story} writeathonId={currWriteathon?.id!}/>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {storyWriteathons.map((storyWriteathon, i) => (
              <Card
                className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={storyWriteathon.story.id}
              >
                <CardHeader>
                  <div className='flex gap-2 justify-evenly'>
                    <div className='relative aspect-[3/4] h-40'>
                      <img
                        alt='Book Cover'
                        src={storyWriteathon.story.cover || BookCover}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='pl-3 flex flex-col gap-2 justify-between'>
                      <CardTitle>{storyWriteathon.story.title}</CardTitle>
                      <CardDescription>{dayjs(storyWriteathon.story.createdAt).fromNow()}</CardDescription>
                      <Button asChild variant="default">
                        <Link href={`/stories/${storyWriteathon.story.id}`}>
                          <div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <VoteButton writeathonId={currWriteathon?.id as string} storyId={storyWriteathon.story.id} categories={categories}/>
              </Card>
            ))}
          </BentoGrid>
        </div> : <Card><CardHeader><CardTitle>This Writeathon has not started yet.</CardTitle></CardHeader></Card>}
      </div>
    </div>
  )
}

export default Writeathon
