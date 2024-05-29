import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import { Button } from '@writeme/wmc/lib/ui/button';

/* eslint-disable-next-line */
export interface UserProps {}

export default function User(props: UserProps) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="relative w-60 h-20 -mx-10">
          <Image src={WriteMeLogo} alt="WriteMe Logo" layout="fill" objectFit="contain" />
        </div>
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
        <Button className='mx-12'>Edit profile</Button>
        
      </div>
    </div>
  );
}
