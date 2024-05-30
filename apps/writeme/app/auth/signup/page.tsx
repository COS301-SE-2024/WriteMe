import {SignupFormDemo} from '@writeme/wmc/lib/ui/signup-form';
// import WriteMeLogo from "../assets/WriteMe.png";

/* eslint-disable-next-line */
export interface MyworksProps {}

export default function SignUp(props: MyworksProps) {
  return (
    <div>
      <nav className="p-8 flex justify-between items-center">
        {/* WriteMe logo */}
        <div className="flex items-center">
          <div style={{ width: "10rem" }}>
            {/* <img src={WriteMeLogo.src} alt="WriteMe Logo" /> */}
          </div>
        </div>
      </nav>

      <SignupFormDemo></SignupFormDemo>
    </div>
  );
}
