'use client'

import { Button } from '@writeme/wmc'
import React, { useState } from 'react'
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { Bookmark } from 'lucide-react';

export interface BookmarkButtonProps {
  storyId: string,
  bookmarked: boolean
}

const BookmarkButton = (props: BookmarkButtonProps) => {
  const [isBookmarked, setBookmarked] = useState(props.bookmarked)

  const handleBookmark = async (storyId: string) => {
    try {
      const response = await fetch('/api/bookmark', {
        method: 'POST', 
        body: JSON.stringify({ storyId: storyId }),
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
      setBookmarked(!isBookmarked)
    
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Button onClick={() => handleBookmark(props.storyId)} variant='ghost' size='icon'>
        <Bookmark fill={isBookmarked ? 'black' : 'transparent'} />
      </Button>
    </>
  )
}

export default BookmarkButton