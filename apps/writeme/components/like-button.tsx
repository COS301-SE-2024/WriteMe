"use client";

import { useSession } from 'next-auth/react';
import { Button } from '@writeme/wmc';
import { HeartIcon } from 'lucide-react';

export interface LikeButtonProps {
  storyId: string;
  chapterId?: string;
}

export default function LikeButton(props: LikeButtonProps){
  const { data: {user} } = useSession();




  return (
    <Button variant="ghost" size="icon">
      <HeartIcon></HeartIcon>
    </Button>
  )


}
