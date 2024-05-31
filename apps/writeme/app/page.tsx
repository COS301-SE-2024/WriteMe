"use client";

import { Button } from "@writeme/wmc/lib/ui/button";
import WriteMeLogo from "../assets/WriteMe.png";
import BooksImage from "../assets/Books.png";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LocalNavbar from "./local-navbar";

export default function Index() {
  const router = useRouter();

  return (
    <div>
      <LocalNavbar />

      <div className="mx-12 py-6 flex justify-between items-center">
        <div>
          <div className="mb-10">
            <div className="mx-9 py-8">
              <h1 className="text-8xl font-bold mx-10">Welcome To</h1>
              <h1 className="text-8xl font-bold mx-10">WriteMe</h1>
            </div>

            <div className="mx-12 py-6">
              <p className="text-lg text-gray-500 mx-10">WriteMe provides you with an amazing</p>
              <p className="text-lg text-gray-500 mx-10">collaborative writing experience. Join</p>
              <p className="text-lg text-gray-500 mx-10">today to unlock your full creative potential!</p>
            </div>

            <div className="flex justify-center mr-10"> {/* Added justify-end to move the button to the right */}
              <Button onClick={() => router.push("/auth/signup")} className="my-10" variant="default" size="lg">Join Today!</Button>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full">
          <Image src={BooksImage} alt="Books" layout="fill" objectFit="contain" ></Image>
        </div>
      </div>
    </div>
  );
}
