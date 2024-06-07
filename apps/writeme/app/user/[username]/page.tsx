import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';
import { IconUser, IconMail } from '@tabler/icons-react';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from '../../../services/users';
import { getPublishedStories } from '../../../services/stories';
import { AvatarImage } from '@writeme/wmc/lib/ui/avatar';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Card, CardDescription, CardHeader, CardTitle } from '@writeme/wmc/lib/ui/card';
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { cn } from '@writeme/wmc/utils';
import BookCover from '../../../assets/temp-cover2.jpg';


/* eslint-disable-next-line */
export interface UserProps {
  params: {
    username: string
  }
}

export default async function User(props: UserProps) {
  const user = await getUser(props.params.username);
  // const stories = await getPublishedStories();

  return (
    <div className="flex flex-col h-screen">
      <LocalNavbar />

      {/* User Profile Section */}
      <div className="flex flex-col items-start p-10">
        <div className="relative w-80 h-80 mb-1">
          <Image src={user ? user.image : Profile} alt="User Profile Image" layout="fill" objectFit="contain" className='rounded-full'/>
        </div>
        <h1 className="text-3xl font-bold mx-12">{user?.name}</h1>
        <p className="text-lg text-gray-500 mx-12 mb-4">Short bio or description about the user.</p>
        <Button className='mx-12 mb-3'><Link href={`/user/${user?.id}/edit-profile`}>Edit profile</Link></Button>
        <div className='flex mx-12 mb-3'>
          <IconUser />
          <a className='font-bold mx-2'>3 </a>
          <a className='text-gray-500'>followers</a>
          {/* user.followers === 1 ? "follower" : "followers" */}
          <a className='font-bold mx-2'>2 </a>
          <a className='text-gray-500'>following</a>
        </div>
        <div className="border-t border-gray-300 my-5 mx-12 w-1/5"></div>
        <div className='flex mx-10'>
          <IconMail className='mx-2' />
          <a>{user?.email}</a>
        </div>
      </div>
    </div>
  );
}
