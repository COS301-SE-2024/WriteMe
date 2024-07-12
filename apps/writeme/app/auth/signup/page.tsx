import { SignupFormDemo } from '@writeme/wmc/lib/ui/signup-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
// import WriteMeLogo from "../assets/WriteMe.png";

/* eslint-disable-next-line */
export interface MyworksProps {}

export default function SignUp(props: MyworksProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalNavbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <SignupFormDemo />
        </div>
      </div>
    </div>
  );
}
