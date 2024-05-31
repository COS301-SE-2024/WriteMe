import {SignupFormDemo} from '@writeme/wmc/lib/ui/signup-form';
import LocalNavbar from './local-navbar';
// import WriteMeLogo from "../assets/WriteMe.png";

/* eslint-disable-next-line */
export interface MyworksProps {}

export default function SignUp(props: MyworksProps) {
  return (
    <div>
      <LocalNavbar />
      <SignupFormDemo />
    </div>
  );
}
