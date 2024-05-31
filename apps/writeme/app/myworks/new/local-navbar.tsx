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
    <div className="bg-white sticky top-0 z-100 border-b h-16 flex p-2 items-center justify-between">
      <div style={{ width: "10rem"}}>
        <Image src={WriteMeLogo} alt="WriteMe Logo"/>
      </div>
      <div className="relative w-12 h-12 mx-4">
        <Link href='/user/username'><Image src={Profile} alt="Profile Image" layout="fill" objectFit="contain" /></Link>
      </div>
    </div>
  );
};

export default LocalNavbar;
