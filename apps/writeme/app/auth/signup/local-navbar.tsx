"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import WriteMeLogo from "../../../assets/WriteMe.png";
import Image from "next/image";
import Link from 'next/link';

const LocalNavbar = () => {
  const router = useRouter();

  return (
    <div className="bg-white sticky top-0 z-100 border-b h-16 flex p-3 items-center justify-between">
      <div className="flex items-center">
          <div style={{ width: "10rem"}}>
            <Image src={WriteMeLogo} alt="WriteMe Logo"/>
          </div>
        </div>

        {/* <div className="flex items-center">
          <p className='font-bold'>Sign Up</p>
        </div> */}
    </div>
  );
};

export default LocalNavbar;
