import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from 'apps/writeme/services/users';
import { getWriteathon } from 'apps/writeme/services/writeathons';
import React from 'react';
import BookCover from '../../../assets/temp-cover2.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';
import Link from 'next/link';
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
import { auth } from 'apps/writeme/auth';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export interface WriteathonProps {
  params: {
    writeathon: string
  }
}

const Writeathon = async (props: WriteathonProps) => {

  const currWriteathon = await getWriteathon(props.params.writeathon)
  const user = await getUser(currWriteathon?.userId!)
  const stories = await getUserStories(user?.id!);

  return (
    <div className="flex flex-col h-screen">
      <LocalNavbar />
      <div className="flex flex-row w-full relative">
        <div className="flex flex-col items-start p-10 w-1/3 sticky top-0 border-b-[1px] border-r-[1px]">
          <h1 className='text-3xl font-bold'>{currWriteathon?.title}</h1>
          <div className='relative aspect-[3/4] h-60'>
            <img
              alt='Writeathon Cover'
              src={currWriteathon?.cover || BookCover} 
              layout='fill'
              objectFit='cover'
            />
          </div>
          <p className="italic text-sm">{currWriteathon?.description}</p>
          <div className='pt-4 grid grid-cols-1'>
            <h1>Start Date:&nbsp; <span className='font-bold'>{format(currWriteathon?.startDate as Date, "PPP")}</span></h1>
            <h1>End Date:&nbsp; <span className='font-bold'>{format(currWriteathon?.endDate as Date, "PPP")}</span></h1>
          </div>
          <Button className='p-0' asChild variant="link">
            <Link href={`/user/${user?.id}`}>{user?.name}</Link>
          </Button>
        </div>

        <div className="flex flex-col p-10 w-2/3">
          <div className='grid grid-cols-2'>
            <h1 className='text-2xl font-bold mb-6'>Entered Stories</h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Enter a story</Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Stories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {stories.map((story, i) => (
                    <DropdownMenuItem className='cursor-pointer'>
                      <div className='relative aspect-[3/4] h-16 p-2'>
                        <img
                          alt='Book Cover'
                          src={story.cover || BookCover} // Use story cover if available
                          layout='fill'
                          objectFit='cover'
                        />
                      </div>
                      <span>{story.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </div>
  )
} 

export default Writeathon