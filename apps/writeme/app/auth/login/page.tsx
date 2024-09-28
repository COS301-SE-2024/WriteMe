// import WriteMeLogo from "../assets/WriteMe.png";

import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import LoginForm from './LoginForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Login | WriteMe',
  description: '',
};

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <LocalNavbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

