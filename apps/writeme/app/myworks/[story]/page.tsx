import styles from './page.module.css';
import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import Book from '../../../assets/HarryPotter.png';
import { Button } from '@writeme/wmc';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc';
import { Bookmark } from 'lucide-react';
import { Share } from 'lucide-react';
import { Download } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';


export interface MyworksProps {}

export default function Write(props: MyworksProps) {
  return (
    <div className="flex flex-col">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="relative w-60 h-20 -mx-10">
          <Image src={WriteMeLogo} alt="WriteMe Logo" layout="fill" objectFit="contain" />
        </div>
        <div className="relative w-12 h-12 mx-4">
          <Image src={Profile} alt="Profile Image" layout="fill" objectFit="contain" />
        </div>
      </nav>

      <div className='flex justify-center'>
        <div className="w-4/3 ">
          <Image
            src={Book}
            alt="Book Image"
            objectFit="contain"
            priority
          />
        </div>
        <div className='my-12'>
          <h1 className='font-bold text-4xl'>Harry Potter: And</h1>
          <h1 className='font-bold text-4xl mb-12'>The Philosopher's Stone</h1>

          <p className='font-bold mb-12'>JK Rowling</p>

          <p className='italic text-sm'>Get ready to uncover the dark secrets and betrayal in the</p>
          <p className='italic text-sm mb-12'>book. A thrilling adventure awaits you.</p>

          <Button>Start reading <ArrowUpRight></ArrowUpRight></Button>

        </div>
      </div>

      <div className="flex justify-center items-center h-full -mr-12"> {/* Centering container for the card */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-full"> {/* Centering container for card content */}
              <div>
                <p> This story follows the journey of a young boy named Harry Potter who discovers he is a wizard on his eleventh birthday. He attends</p>
                <p> Hogwarts School of Witchcraft and Wizardry, where he learns about friendship, bravery, and the magical world he belongs to. </p>
                <p> Alongside his new friends Ron Weasley and Hermione Granger, Harry uncovers the mystery surrounding the Philosopher's Stone,</p>
                <p> an object with the power to grant immortality. Their adventure pits them against the dark wizard Voldemort, culminating in a thrilling</p>
                <p> showdown to protect the stone and the wizarding world from evil.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-center items-center h-full space-x-4"> {/* Centering container for card footer */}
              <Bookmark></Bookmark>
              <Share></Share>
              <Download></Download>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
