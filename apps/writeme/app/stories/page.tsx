import styles from './page.module.css';
import { db } from '../../db/db';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Button, Card, CardDescription, CardHeader, CardTitle } from '@writeme/wmc';
import { cn } from '@writeme/wmc/utils';
import Image from 'next/image';
import BookCover from '../../assets/temp-cover2.jpg';
import * as dayjs from 'dayjs';
import { BookOpenText, Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPublishedStories } from '../../services/stories';

export const dynamic = 'force-dynamic';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';

/* eslint-disable-next-line */
export interface StoriesProps {}



export default async function Stories(props: StoriesProps) {
  const stories = await getPublishedStories();
  dayjs.extend(relativeTime)
  return (
    <div>
      <LocalNavbar />

      <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
        {stories.map((story, i) =>
          <Card className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={story.id}>
            <CardHeader>
              <div className='flex gap-2 justify-evenly'>
                <div className='relative aspect-[3/4] h-40'>
                  <img
                    alt='Book Cover'
                    src={story.cover}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
                <div className='pl-3 flex flex-col gap-2 justify-between'>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>{dayjs(story.createdAt).fromNow()}</CardDescription>
                  <div className='flex pt-5 items-center'>
                    <CardDescription><Heart /></CardDescription><p className='text-[15px] pr-2'>{story.likes.length}</p>
                    <CardDescription><MessageCircle /></CardDescription><p className='text-[15px] pr-2'>{story.comments.length}</p>
                    <CardDescription><ShareStory link={`https://writeme.co.za./stories/${story.id}`} message={`Check out ${story.title}`}></ShareStory> </CardDescription>
                  </div>

                  <Button asChild variant="default">
                    <Link href={`/stories/${story.id}`}><div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div></Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            {/* <Trash2 className='cursor-pointer p-5' size={70}/> */}
          </Card>

        )}

        { stories.length === 0 ? <span className="text-center grow" >There are currently no published stories.</span> : <></>}
      </BentoGrid>



    </div>
  );
}
