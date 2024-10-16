import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@writeme/wmc';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { cn } from '@writeme/wmc/utils';
import { getAllUpCommingWriteathons, getAllWriteathons } from 'apps/writeme/services/writeathons';
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import BookCover from '../../assets/temp-cover2.jpg';
import React from 'react';
import { format } from 'date-fns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@writeme/wmc/lib/ui/breadcrumb';
// import WriteathonCountDown from "../../components/WriteathonCountDown"

import dynamicR from "next/dynamic";

const WriteathonCountDown = dynamicR(() => import("../../components/WriteathonCountDown"), {ssr: false});
export const dynamic = 'force-dynamic';
import ConfettiAnimation from 'apps/writeme/components/confetti-animation';

export interface WriteathonProps {

}

const Writeathons = async (props: WriteathonProps) => {
  const currDate = new Date();
  const writeathons = await getAllWriteathons(currDate);
  const upcomming_writeathons = await getAllUpCommingWriteathons(currDate);

  return (
    <>
      <LocalNavbar />
      <Button className="m-8"><Link href="/writeathons/new">Create a Writeathon</Link></Button>
      <div className="p-8">
        <Card className="flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center">Live Writeathons</CardTitle>
          </CardHeader>
          <CardContent>
            <BentoGrid className="max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto lg:auto-rows-[20rem]">
              {writeathons.map((writeathon, i) => (
                <Card
                  className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? 'md:col-span-2' : '')}
                  key={writeathon.id}
                >
                  <CardHeader>
                    <div className="flex gap-2 justify-evenly">
                      <div className="relative aspect-[3/4] h-40 overflow-hidden">
                        <img
                          className='object-cover'
                          alt="Writeathon Cover"
                          src={writeathon.cover || BookCover}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="pl-3 flex flex-col gap-2 justify-between">
                        <CardTitle className='text-ellipsis	'>{writeathon.title}</CardTitle>
                        <CardDescription className='text-ellipsis	'>{writeathon.brief}</CardDescription>

                        <Button asChild variant="default">
                          <Link href={`/writeathons/${writeathon.id}`}>
                            <div className="flex gap-1 items-center"><BookOpenText size="1rem" /> View</div>
                          </Link>
                        </Button>

                        <CardDescription>Start Date: <span
                          className="font-bold">{format(writeathon?.startDate as Date, 'PPP')}</span></CardDescription>
                        <CardDescription>End Date: <span
                          className="font-bold">{format(writeathon?.endDate as Date, 'PPP')}</span></CardDescription>
                      </div>
                    </div>
                  <div className="flex flex-col justify-between">
                    <span>Ending in...</span>
                    <WriteathonCountDown date={writeathon.endDate} withRefresh={false}/>
                  </div>
                  </CardHeader>
                  
                </Card>
              ))}
              {writeathons.length == 0 && (<h3 className="col-span-3">There are currently no live writeathons.</h3>)}
            </BentoGrid>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <p className="p-1">
              These are Writeathons that are currently live, why not enter on of your creations?</p>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center">Upcomming Writeathons</CardTitle>
          </CardHeader>
          <CardContent>
            <BentoGrid className="max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto md:auto-rows-[20rem]">
              {upcomming_writeathons.map((writeathon, i) => (
                <Card
                  className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? 'md:col-span-2' : '')}
                  key={writeathon.id}
                >
                  <CardHeader>
                    <div className="flex gap-2 justify-evenly">
                      <div className="relative aspect-[3/4] h-40 overflow-hidden overflow-hidden">
                        <img
                        className='object-contain'
                          alt="Writeathon Cover"
                          src={writeathon.cover || BookCover}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="pl-3 flex flex-col gap-2 justify-between">
                        <CardTitle className='text-ellipsis'>{writeathon.title}</CardTitle>
                        <CardDescription className='text-ellipsis'>{writeathon.brief}</CardDescription>

                        <Button asChild variant="default">
                          <Link href={`/writeathons/${writeathon.id}`}>
                            <div className="flex gap-1 items-center"><BookOpenText size="1rem" /> View</div>
                          </Link>
                        </Button>

                        <CardDescription>Start Date: <span
                          className="font-bold">{format(writeathon?.startDate as Date, 'PPP')}</span></CardDescription>
                        <CardDescription>End Date: <span
                          className="font-bold">{format(writeathon?.endDate as Date, 'PPP')}</span></CardDescription>
                    </div>
                    </div>
                    <div className="flex flex-col justify-between">
                    <span>Starting in...</span>
                    <WriteathonCountDown date={writeathon.startDate} withRefresh={false}/>
                  </div>
                  </CardHeader>
                </Card>
              ))}
              {upcomming_writeathons.length == 0 && (
                <h3 className="col-span-3">There are currently upcomming writeathons.</h3>)}
            </BentoGrid>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <p className="p-1">
              These are Writeathons that will soon be live, why not start prepping?</p>
          </CardFooter>
        </Card>


      </div>
    </>
  );
};

export default Writeathons;
