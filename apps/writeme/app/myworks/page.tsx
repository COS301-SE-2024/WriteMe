import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@writeme/wmc/lib/ui/card"
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react"
import Image from 'next/image';
import BookCover from '../../assets/temp-cover2.jpg'
import LocalNavbar from './local-navbar';
import { db } from '../../db/db';
import { stories} from '../../db/schema'
import { auth } from '../../auth';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { cn } from '@writeme/wmc/utils';
import Link from 'next/link';

async function getMyStories(){
  const session = await auth();

  const result = db.query.stories.findMany({
    where: (stories, {eq}) => eq(stories.userId, session.user.id)
  })
  return result;
}

export interface MyworksProps {}

/* eslint-disable-next-line */
export default async function Myworks(props: MyworksProps) {
  const stories = await getMyStories();
  dayjs.extend(relativeTime)


  return (
    <div >
      <LocalNavbar></LocalNavbar>

      <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
        {stories.map((story, i) =>
          <Card className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={story.id}>
            <CardHeader>
              <div className='flex'>
                <div className='relative aspect-[3/4] h-40'>
                  <Image
                    alt='Book Cover'
                    src={BookCover}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
                <div className='pl-3'>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>{dayjs(story.createdAt).fromNow()}</CardDescription>
                  <div className='flex pt-5'>
                    <CardDescription><Heart className='cursor-pointer' size={20}/></CardDescription><p className='text-[15px] pr-2'>12</p>
                    <CardDescription><MessageCircle className='cursor-pointer' size={20}/></CardDescription><p className='text-[15px] pr-2'>2</p>
                    <CardDescription><Share2 className='cursor-pointer' size={20}/></CardDescription>
                  </div>

                  <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2" href={`/myworks/${story.id}/write/${story.id}`}>Write!</Link>
                </div>
              </div>
            </CardHeader>
            {/* <Trash2 className='cursor-pointer p-5' size={70}/> */}
          </Card>

        )}
      </BentoGrid>


    </div>
  );
}
