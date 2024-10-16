import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@writeme/wmc';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Link } from 'lucide-react';
import React from 'react';
import NotFountImage from '../../assets/not_found.svg';
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <LocalNavbar />
      <div className="w-screen h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>
              You are currently Offline, but don't worry changes you've made to your stories/chapters have been saved to your browser.
              You may still have access to certain cached pages, and if you still have acces to the editor you can keep editing!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image alt="Not Found Image" src={NotFountImage}></Image>
            <Button asChild variant="default" size="lg">
              <Link href="/">Home</Link>
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-xs">
              <a href="https://storyset.com/web">
                Web illustrations by Storyset
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
