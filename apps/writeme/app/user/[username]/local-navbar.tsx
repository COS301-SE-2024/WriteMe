"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import WriteMeLogo from "../../../assets/WriteMe.png";
import Image from "next/image";
import Link from 'next/link';
import Profile from '../../../assets/profile.jpg';

const LocalNavbar = () => {
  const router = useRouter();

  return (
    <div className="bg-white sticky top-0 z-50 border-b h-16 flex p-2 items-center justify-between">
      <Link href="/" style={{ width: "10rem"}}>
        <Image src={WriteMeLogo} alt="WriteMe Logo"/>
      </Link>

      <ul className="flex space-x-8">
        <li>
        <Link href="#overview" className="text-black hover:text-purple-200 relative after:content-[''] after:block after:w-full after:h-1 after:bg-[#a2a8f0] after:mt-1 after:rounded-full">
            Overview
          </Link>
        </li>
        <li>
          <Link href="#stories" className="text-black hover:text-purple-200">
            Stories
          </Link>
        </li>
      </ul>

      <div className="relative w-12 h-12 mx-4">
        <Link href='/user/username'><Image src={Profile} alt="Profile Image" layout="fill" objectFit="contain" /></Link>
      </div>
    </div>
  );
};

export default LocalNavbar;
