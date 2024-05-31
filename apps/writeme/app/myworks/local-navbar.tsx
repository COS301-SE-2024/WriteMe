"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';


const LocalNavbar = () => {
  const router = useRouter();

  return (
    <div className="border-b h-16 flex p-2 items-center justify-between">
      <p className="text-4xl font-bold">My Works</p>
      <Button role="link" onClick={() => router.push('/myworks/new')}>New Story</Button>
    </div>
  );
};

export default LocalNavbar;
