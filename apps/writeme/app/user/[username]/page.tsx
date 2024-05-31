import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';
import { IconUser, IconMail } from '@tabler/icons-react';

/* eslint-disable-next-line */
export interface UserProps {}

export default function User(props: UserProps) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full flex justify-between items-center p-3">
        <div className="relative w-60 h-20 -mx-10">
          <Image src={WriteMeLogo} alt="WriteMe Logo" layout="fill" objectFit="contain" />
        </div>

        <ul className="flex space-x-8">
          <li>
          <a href="#overview" className="text-black hover:text-purple-200 relative after:content-[''] after:block after:w-full after:h-1 after:bg-[#a2a8f0] after:mt-1 after:rounded-full">
              Overview
            </a>
          </li>
          <li>
            <a href="#stories" className="text-black hover:text-purple-200">
              Stories
            </a>
          </li>
        </ul>

        <div className="relative w-12 h-12 mx-4">
          <Image src={Profile} alt="Profile Image" layout="fill" objectFit="contain" />
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="flex flex-col items-start p-10">
        <div className="relative w-80 h-80 mb-1"> 
          <Image src={Profile} alt="User Profile Image" layout="fill" objectFit="contain" />
        </div>
        <h1 className="text-3xl font-bold mx-12">Username</h1>
        <p className="text-lg text-gray-500 mx-12 mb-4">Short bio or description about the user.</p>
        <Button className='mx-12 mb-3'>Edit profile</Button>
        <div className='flex mx-12 mb-3'>
          <IconUser />
          <a className='font-bold mx-2'>1 </a>
          <a className='text-gray-500'>follower .</a>
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
