"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface LocalNavbarProps {
  title: string;
  // published: boolean;

}

const LocalNavbar = (props: LocalNavbarProps) => {
  // const router = useRouter();

  return (
    <div className="bg-background sticky top-0 z-50 border-b h-16 flex p-2 items-center justify-between">
      <div className="flex items-center gap-4">
          <Link href="/myworks">
            <Button variant='secondary'><ArrowLeft></ArrowLeft></Button>
          </Link>
          <h2>{props.title}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant='default'> Preview </Button>
          <Button variant='default'> Save </Button>
          <Button variant='default'> Publish </Button>
        </div>
    </div>
  );
};

export default LocalNavbar;
