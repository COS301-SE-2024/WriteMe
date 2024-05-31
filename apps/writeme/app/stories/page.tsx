import styles from './page.module.css';
import { db } from '../../db/db';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Card, CardDescription, CardHeader, CardTitle } from '@writeme/wmc';
import { cn } from '@writeme/wmc/utils';
import Image from 'next/image';
import BookCover from '../../assets/temp-cover2.jpg';
import * as dayjs from 'dayjs';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPublishedStories } from '../../services/stories';

export const dynamic = 'force dynamic';

/* eslint-disable-next-line */
export interface StoriesProps {}



export default async function Stories(props: StoriesProps) {
  const stories = await getPublishedStories();
  dayjs.extend(relativeTime)
  return (
    <div>
      <h1 className="font-bold text-6xl text-center">Explore!</h1>

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

                  <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 p-2" href={`/stories/${story.id}`}>Read!</Link>
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
