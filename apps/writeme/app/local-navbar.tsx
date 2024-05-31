"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { ModeToggle } from '@writeme/wmc/lib/ui/theme-switcher'
import WriteMeLogo from "../assets/WriteMe.png";
import Image from "next/image";
import Link from 'next/link';

const LocalNavbar = () => {
  const router = useRouter();

  return (
    <div className="bg-white sticky top-0 z-50 border-b h-16 flex p-3 items-center justify-between">
      <div className="flex items-center">
        <Link href="/" style={{ width: "10rem"}}>
          <Image src={WriteMeLogo} alt="WriteMe Logo"/>
        </Link>
        </div>

        <div className="flex items-center gap-2">
          <ul className="flex space-x-8">
            <li><Link href="/stories" className="text-black hover:underline">Explore</Link></li>
          </ul>
          <Button variant="default" size="default" onClick={() => router.push("/auth/login")}>Login</Button>
          <ModeToggle></ModeToggle>
        </div>
    </div>
  );
};

export default LocalNavbar;
