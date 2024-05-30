import { Button } from "@writeme/wmc/lib/ui/button";
import WriteMeLogo from "../assets/WriteMe.png";
import BooksImage from "../assets/Books.png";
import Image from "next/image";

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <nav className="p-4 flex justify-between items-center">
        {/* WriteMe logo */}
        <div className="flex items-center">
          <div style={{ width: "10rem"}}>
            <img src={WriteMeLogo.src} alt="WriteMe Logo"/>
          </div>
        </div>
        
        <div className="flex items-center">
          <ul className="flex space-x-8">
            <li><a href="#explore" className="text-black hover:underline mx-5">Explore</a></li>
          </ul>
          <Button variant="default" size="default">Sign Up</Button>
        </div>
      </nav>

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
              <Button className="my-10" variant="default" size="lg">Join Today!</Button>
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
