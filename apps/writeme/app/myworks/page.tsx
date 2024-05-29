import styles from './page.module.css';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader,
  CardTitle 
} from "@writeme/wmc/lib/ui/card"
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react"
import Image from 'next/image';
import BookCover from '../../assets/temp-cover2.jpg'
export interface MyworksProps {}

/* eslint-disable-next-line */
export default function Myworks(props: MyworksProps) {
  return (
    <div className={styles['container']}>
      <div className='grid grid-cols-1 gap-4'>
        <h1 className='font-bold text-[40px]'>My Stories</h1>
        <Card className='w-1/2'>
          <Trash2 className='cursor-pointer float-right p-5' size={70}/>
          <CardHeader>
            <div className='flex'>
              <div className='relative aspect-[3/4] h-40'>
                <Image
                  alt='Book Cover'
                  src={BookCover}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <div className='pl-3'>
                <CardTitle>My Book</CardTitle>
                <CardDescription>Updated 7 minutes ago</CardDescription>
                <div className='flex pt-5'>
                  <CardDescription><Heart className='cursor-pointer' size={20}/></CardDescription><p className='text-[15px] pr-2'>12</p>
                  <CardDescription><MessageCircle className='cursor-pointer' size={20}/></CardDescription><p className='text-[15px] pr-2'>2</p>
                  <CardDescription><Share2 className='cursor-pointer' size={20}/></CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
