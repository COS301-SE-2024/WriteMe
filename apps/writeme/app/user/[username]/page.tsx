import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';

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
    </div>
  );
}
