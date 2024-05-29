import { Button } from "@writeme/wmc/lib/ui/button";
import WriteMeLogo from "../assets/WriteMe.png";
import BooksImage from "../assets/Books.png";

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <nav className="p-4 flex justify-between items-center mb-12">
        {/* WriteMe logo */}
        <div className="flex items-center">
          <div style={{ width: "10rem"}}>
            <img src={WriteMeLogo.src} alt="WriteMe Logo"/>
          </div>
        </div>
        
        <ul className="flex space-x-8">
          <li><a href="#explore" className="text-black hover:underline">Explore</a></li>
        </ul>

        <Button variant="default" size="default">Sign Up</Button>
      </nav>

      <div className="mx-12 py-6 flex justify-between items-center">
        <div>
          <div className="mb-10">
            <div className="mx-9 py-8">
              <h1 className="text-8xl font-bold mb-5">Welcome to </h1>
              <h1 className="text-8xl font-bold">WriteMe</h1>
            </div>

            <div className="mx-12 py-6">
              <p className="text-lg text-gray-500">WriteMe provides you with an amazing</p>
              <p className="text-lg text-gray-500">collaborative writing experience. Join</p>
              <p className="text-lg text-gray-500">today to unlock your full creative potential!</p>
            </div>

            <Button className="my-10 mx-10" variant="default" size="lg">Join Today!</Button>
          </div>
        </div>
        
        <img src={BooksImage.src} alt="Books" style={{height: "40rem" , width: "50rem"}} className="-my-10"/>
      </div>
    </div>
  );
}
