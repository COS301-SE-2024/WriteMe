import BooksImage from "../assets/Books.png";
import Image from "next/image";
import Link from 'next/link';
import LocalNavbar from "@writeme/wmc/lib/ui/local-navbar";

export default function Index() {

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
              <Link data-testid='join_now_link' href="/auth/signup">Join Now</Link>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full">
          <Image src={BooksImage} alt="Books" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
