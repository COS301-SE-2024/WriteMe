import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@writeme/wmc'
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid'
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar'
import { cn } from '@writeme/wmc/utils'
import { getAllWriteathons } from 'apps/writeme/services/writeathons'
import { BookOpenText } from 'lucide-react'
import Link from 'next/link'
import BookCover from '../../assets/temp-cover2.jpg';
import React from 'react'
import { format } from "date-fns";

export interface WriteathonProps {

}

const Writeathons = async (props: WriteathonProps) => {
  const currDate = new Date()
  const writeathons = await getAllWriteathons(currDate)
  
  return (
    <>
      <LocalNavbar />
      <Button className='m-8'><Link href="/writeathons/new">Create a Writeathon</Link></Button>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {writeathons.map((writeathon, i) => (
            <Card
              className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
              key={writeathon.id}
            >
              <CardHeader>
                <div className='flex gap-2 justify-evenly'>
                  <div className='relative aspect-[3/4] h-40'>
                    <img
                      alt='Writeathon Cover'
                      src={writeathon.cover || BookCover} 
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='pl-3 flex flex-col gap-2 justify-between'>
                    <CardTitle>{writeathon.title}</CardTitle>
                    <CardDescription>{writeathon.brief}</CardDescription>

                    <Button asChild variant="default">
                      <Link href={`/writeathons/${writeathon.id}`}>
                        <div className="flex gap-1 items-center"><BookOpenText size="1rem"/> View</div>
                      </Link>
                    </Button>

                    <CardDescription>Start Date: <span className='font-bold'>{format(writeathon?.startDate as Date, "PPP")}</span></CardDescription>
                    <CardDescription>End Date: <span className='font-bold'>{format(writeathon?.endDate as Date, "PPP")}</span></CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </BentoGrid>
    </>
  )
}

export default Writeathons