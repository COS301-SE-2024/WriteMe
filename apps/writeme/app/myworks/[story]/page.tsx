import styles from './page.module.css';
import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import Book from '../../../assets/HarryPotter.png';

/* eslint-disable-next-line */
export interface MyworksProps {}

export default function Write(props: MyworksProps) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="relative w-60 h-20 -mx-10">
          <Image src={WriteMeLogo} alt="WriteMe Logo" layout="fill" objectFit="contain" />
        </div>
        <div className="relative w-12 h-12 mx-4">
          <Image src={Profile} alt="Profile Image" layout="fill" objectFit="contain" />
        </div>
      </nav>

      <div className='flex justify-center'>
        <div className="w-4/3">
          <Image
            src={Book}
            alt="Book Image"
            // layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <div className='my-12'>
          <h1 className='font-bold text-4xl'>Harry Potter: And</h1>
          <h1 className='font-bold text-4xl mb-6'>The Pholosopher's Stone</h1>

          <p className='font-bold mb-6'>JK Rowling</p>

          <p className='italic text-sm'>Get ready to uncover the dark secrets and betrayal in the</p>
          <p className='italic text-sm'>book. A thrilling adventure awaits you.</p>

        </div>
      </div>
      
    </div>
  );
}
