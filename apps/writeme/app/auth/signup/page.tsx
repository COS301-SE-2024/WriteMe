import { SignupFormDemo } from '@writeme/wmc/lib/ui/signup-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
// import WriteMeLogo from "../assets/WriteMe.png";

export const metadata = {
  title: 'Signup | WriteMe',
  description: '',
};

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
