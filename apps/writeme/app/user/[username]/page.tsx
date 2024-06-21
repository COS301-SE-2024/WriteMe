import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import { Button, buttonVariants } from '@writeme/wmc/lib/ui/button';
import { IconUser, IconMail } from '@tabler/icons-react';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from '../../../services/users';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Card, CardDescription, CardHeader, CardTitle } from '@writeme/wmc/lib/ui/card';
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { cn } from '@writeme/wmc/utils';
import BookCover from '../../../assets/temp-cover2.jpg';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { auth } from 'apps/writeme/auth';
import { getMyDrafts, getUserStories } from 'apps/writeme/services/stories';
import FollowButton from 'apps/writeme/components/follow-button';
import { isFollowing } from '../../../services/users';

export interface UserProps {
  params: {
    username: string;
  };
}

dayjs.extend(relativeTime);

export default async function User(props: UserProps) {
  const user = await getUser(props.params.username);
  const stories = await getUserStories(props.params.username);

  const session = await auth()
  if (session?.user){
    var drafts = await getMyDrafts();
  }

  const following = await isFollowing(session?.user?.id as string, props.params.username)

  return (
    <div className="flex flex-col h-screen">
      <LocalNavbar />
      <div className="flex flex-row w-full relative">
        <div className="flex flex-col items-start p-10 w-1/3 sticky top-0">
          <div className="relative w-80 h-80 mb-1">
            <Image src={user.image ? user.image : Profile} alt="User Profile Image" layout="fill" objectFit="contain" className='rounded-full'/>
          </div>
          <h1 className="text-3xl font-bold mx-12">{user?.name}</h1>
          <p className="text-lg text-gray-500 mx-12 mb-4">{user?.bio}</p>
          {session?.user?.id == props.params.username ? <Button className='mx-12 mb-3'><Link href={`/user/${user?.id}/edit-profile`}>Edit profile</Link></Button> 
          : 
          <FollowButton userId={props.params.username} following={following} />}
          <div className='flex mx-12 mb-3'>
            <IconUser />
            <a className='font-bold mx-2'>{user?.followers.length}</a>
            <a className='text-gray-500'>{user?.followers.length === 1 ? "follower" : "followers"}</a>
            <a className='font-bold mx-2'>{user?.following.length}</a>
            <a className='text-gray-500'>following</a>
          </div>
          <div className="border-t border-gray-300 my-5 mx-6 w-full"></div>
          <div className='flex items-center mx-10'>
            <IconMail className='mx-2' />
            <Button asChild variant={"link"}>
              <a href={`mailto:${user?.email}`}>{user?.email}</a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col p-10 w-2/3">
          <h2 className="text-2xl font-bold mb-6">Published Work</h2>
          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {stories.map((story, i) => (
              <Card
                className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={story.id}
              >
                <CardHeader>
                  <div className='flex gap-2 justify-evenly'>
                    <div className='relative aspect-[3/4] h-40'>
                      <img
                        alt='Book Cover'
                        src={story.cover || BookCover} // Use story cover if available
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='pl-3 flex flex-col gap-2 justify-between'>
                      <CardTitle>{story.title}</CardTitle>
                      <CardDescription>{dayjs(story.createdAt).fromNow()}</CardDescription>
                      <Button asChild variant="default">
                        <Link href={`/stories/${story.id}`}>
                          <div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </BentoGrid>
          {session?.user?.id == props.params.username ?<><h2 className="text-2xl font-bold mb-6">Drafts</h2>
          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {drafts.map((story, i) => (
              <Card
                className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
                key={story.id}
              >
                <CardHeader>
                  <div className='flex gap-2 justify-evenly'>
                    <div className='relative aspect-[3/4] h-40'>
                      <img
                        alt='Book Cover'
                        src={story.cover || BookCover} // Use story cover if available
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='pl-3 flex flex-col gap-2 justify-between'>
                      <CardTitle>{story.title}</CardTitle>
                      <CardDescription>{dayjs(story.createdAt).fromNow()}</CardDescription>
                      <Button asChild variant="default">
                        <Link href={`/stories/${story.id}`}>
                          <div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </BentoGrid></>:<></>}
        </div>
      </div>
    </div>
  );
}
