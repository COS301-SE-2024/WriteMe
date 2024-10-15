import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc/lib/ui/card';
import {
  BookOpenText,
  Heart,
  MessageCircle,
  Pencil,
  Share2,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import BookCover from '../../assets/temp-cover2.jpg';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { db } from '../../db/db';
import { stories } from '../../db/schema';
import { auth } from '../../auth';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cn } from '@writeme/wmc/utils';
import Link from 'next/link';
import { Button, buttonVariants } from '@writeme/wmc';
import { getMyStories } from '../../services/stories';

export const metadata = {
  title: 'My Works | WriteMe',
  description: '',
};

export const dynamic = 'force-dynamic';

export interface MyworksProps {}

/* eslint-disable-next-line */
export default async function Myworks(props: MyworksProps) {
  const stories = await getMyStories();
  dayjs.extend(relativeTime);

  return (
    <div>
      <LocalNavbar />

      <BentoGrid className="max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto md:auto-rows-[20rem]">
        {stories.length > 0 ? stories.map((story, i) =>
          <Card className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={story.id}>
            <CardHeader>
              <div className='flex gap-2 justify-evenly'>
                <div className='relative aspect-[3/4] h-40 overflow-hidden'>
                  <img
                    className='object-contain'
                    alt='Book Cover'
                    src={story.cover}
                  />
                </div>
                <div className='pl-3 flex flex-col gap-2 justify-between'>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>
                    {dayjs(story.createdAt).fromNow()}
                  </CardDescription>
                  <div className="flex gap-1">
                    <Button asChild variant="default">
                      <Link href={`/myworks/${story.id}`}>
                        <div className="flex gap-1 items-center">
                          <BookOpenText size="1rem" /> View
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            {/* <Trash2 className='cursor-pointer p-5' size={70}/> */}
          </Card>

        ): <Card className="p-8 col-span-3">
            <CardTitle>You currently have no stories of your own.</CardTitle>
            <CardDescription>You can create your first story in the navbar above or click the button below.</CardDescription>
            <CardContent>
                  <Button asChild>
                    <Link href="/myworks/new">Create Story</Link>
                  </Button>
            </CardContent>
          </Card>}
      </BentoGrid>
    </div>
  );
}
