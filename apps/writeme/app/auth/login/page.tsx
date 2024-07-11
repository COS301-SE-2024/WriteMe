// import WriteMeLogo from "../assets/WriteMe.png";

import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login | WriteMe',
  description: '',
};

export default function Login() {
  return (
    <div>
      <LocalNavbar />
      <LoginForm />
    </div>
  );
}
