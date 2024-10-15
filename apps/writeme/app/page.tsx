import BooksImage from '../assets/Books.png';
import Image from 'next/image';
import Link from 'next/link';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import BooksAnimation from '../components/books-animation';
import { Button } from '@writeme/wmc';
import { auth } from '../auth';

export const metadata = {
  title: 'Home | WriteMe',
};

export default async function Index() {
  const session = await auth();

  return (
    <div className="h-screen">
      <LocalNavbar />
      <div className="flex overflow-hidden h-full lg:flex-row">
        <div className="min-w-[40ch] md:min-w-[70ch]">
          <div className="flex flex-col justify-evenly h-full p-2 md:p-10">
            <div className="flex flex-col gap-10">
              <div className="">
                <h1 className="flex flex-col text-8xl">
                  <span className="font-bold">Welcome To</span>
                  <span className="font-accent">
                    <span className="text-primary dark:text-indigo-500">
                      Write
                    </span>
                    Me
                  </span>
                </h1>
              </div>

              <div className="text-lg text-gray-500">
                <p>WriteMe provides you with an amazing</p>
                <p>collaborative writing experience. Join</p>
                <p>today to unlock your full creative potential!</p>
              </div>
            </div>

            <div className="flex justify-start">
              {' '}
              {/* Added justify-end to move the button to the right */}
              <Button asChild variant="default" size="lg">
                {session?.user ? <Link href="/myworks">My Works</Link> : <Link data-testid="join_now_link" href="/auth/signup">Join Now</Link>}
                
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-[66vw] ml-[15vw] md:-ml-[15vw] ">
          <BooksAnimation></BooksAnimation>
        </div>
      </div>
    </div>
  );
}
