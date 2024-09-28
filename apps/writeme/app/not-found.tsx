import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@writeme/wmc';
import Image from 'next/image';
import NotFountImage from '../assets/not_found.svg';
import Link from 'next/link';
const NotFound = () => {
  return (
    <div>
      <LocalNavbar />
      <div className="w-screen h-screen flex justify-center items-center">
        <Card>
          <CardHeader>
            <CardTitle>
              The page that you are looking for does not exist or could not be found
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

export default NotFound;
