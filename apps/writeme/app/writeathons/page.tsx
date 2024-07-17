import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@writeme/wmc'
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid'
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar'
import { cn } from '@writeme/wmc/utils'
import { getAllWriteathons } from 'apps/writeme/services/writeathons'
import Link from 'next/link'
import React from 'react'

export interface WriteathonProps {

}

const Writeathons = async (props: WriteathonProps) => {
  const writeathons = await getAllWriteathons()
  return (
    <>
      <LocalNavbar />
      <Button><Link href="/writeathons/new">Create a Writeathon</Link></Button>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {writeathons.map((writeathon, i) => (
            <Card
              className={cn('row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4', i === 3 || i === 6 ? "md:col-span-2" : "")}
              key={writeathon.id}
            >
              <CardHeader>
                <div className='flex gap-2 justify-evenly'>
                  <div className='pl-3 flex flex-col gap-2 justify-between'>
                    <CardTitle>{writeathon.title}</CardTitle>
                    <CardDescription>{dayjs(writeathon.startDate)}</CardDescription>
                    <CardDescription>{dayjs(writeathon.endDate)}</CardDescription>
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