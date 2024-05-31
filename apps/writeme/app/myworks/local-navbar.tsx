"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import WriteMeLogo from "../../assets/WriteMe.png";
import Image from "next/image";
import Link from 'next/link';
// import { IconUser } from '@tabler/icons-react';
import Profile from '../../assets/profile.jpg';
import { ModeToggle } from '@writeme/wmc/lib/ui/theme-switcher';

const LocalNavbar = () => {
  const router = useRouter();

  return (
    <div className="bg-background sticky top-0 z-50 border-b h-16 flex p-2 items-center justify-between dar">
      <Link href="/" style={{ width: "10rem"}}>
        <Image src={WriteMeLogo} alt="WriteMe Logo"/>
      </Link>
      <ul className='flex gap-2 items-center'>
        <li><Link href='/myworks' className="text-black text-foreground hover:text-primary relative after:content-[''] after:block after:w-full after:h-1 after:bg-[#a2a8f0] after:mt-1 after:rounded-full">My Stories</Link></li>
        <li><Link href='/stories' className='text-black text-foreground hover:text-primary'>Explore</Link></li>
      </ul>

      <div className='flex items-center gap-2'>
        <Button role="link" onClick={() => router.push('/myworks/new')}>New Story</Button>

        <ModeToggle></ModeToggle>

        <div className="relative w-12 h-12">
          <Link href='/user/username'><Image className="rounded-full" src={Profile} alt="Profile Image" layout="fill" objectFit="contain" /></Link>
        </div>
      </div>
    </div>
  );
};

export default LocalNavbar;
