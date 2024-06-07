import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';
import { IconUser, IconMail } from '@tabler/icons-react';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from '../../../services/users';

/* eslint-disable-next-line */
export interface UserProps {
  params: {
    username: string
  }
}

export default async function User(props: UserProps) {
  const user = await getUser(props.params.username);

  return (
    <div className="flex flex-col h-screen">
      <LocalNavbar />

      {/* User Profile Section */}
      <div className="flex flex-col items-start p-10">
        <div className="relative w-80 h-80 mb-1">
          <Image src={Profile} alt="User Profile Image" layout="fill" objectFit="contain" />
        </div>
        <h1 className="text-3xl font-bold mx-12">{user?.name}</h1>
        <p className="text-lg text-gray-500 mx-12 mb-4">Short bio or description about the user.</p>
        <Button className='mx-12 mb-3'>Edit profile</Button>
        <div className='flex mx-12 mb-3'>
          <IconUser />
          <a className='font-bold mx-2'>3 </a>
          <a className='text-gray-500'>followers</a>
          <a className='font-bold mx-2'>2 </a>
          <a className='text-gray-500'>following</a>
        </div>
        <div className="border-t border-gray-300 my-5 mx-12 w-1/5"></div>
        <div className='flex mx-10'>
          <IconMail className='mx-2' />
          <a>user@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
