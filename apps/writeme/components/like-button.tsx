"use client";

import { useSession } from 'next-auth/react';
import { Button } from '@writeme/wmc';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';

export interface LikeButtonProps {
  storyId: string;
  chapterId?: string;
  liked?: boolean;
}

export default function LikeButton( {storyId , chapterId, liked = false}: LikeButtonProps){
  // const { data: {user} } = useSession();
  const [isLiked, setisLiked] = useState(liked);

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({ storyId: storyId, chapterId: chapterId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json()

      if (!response.ok) {
        if (Array.isArray(result.errors) && result.errors.length > 0) {
          result.errors.forEach((error: any) => {
            toast({
              title: error.message,
              variant: 'destructive'
            })
          });

          return;
        }

        toast({
          title: result.message,
          variant: 'destructive'
        })
        return;
      }
      toast({
        title: result.message,
        variant: "default"
      })
      setisLiked(!isLiked)

    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }


  return (
    <Button variant="ghost" size="icon" onClick={handleLike}>
      <HeartIcon fill={isLiked ? "red" : "transparent"} stroke={isLiked ? "red" : "black"} ></HeartIcon>
    </Button>
  )


}
