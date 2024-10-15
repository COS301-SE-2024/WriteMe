'use client'

import React, { useState } from 'react';
import { getUserStories } from '../services/stories';
import { DropdownMenuItem } from '@writeme/wmc/lib/ui/dropdown-menu';
import BookCover from '../assets/temp-cover2.jpg';
import { toast } from '@writeme/wmc/lib/ui/use-toast';

export interface StorySelectorProps {
  story: any,
  writeathonId: string
}

const StorySelector = (props: StorySelectorProps) => {

  const handleStorySelection = async (storyId: string, writeathonId: string) => {
    try {
      const res = await fetch('/api/story-writeathons', {
        method: 'POST', 
        body: JSON.stringify({ storyId: storyId, writeathonId: writeathonId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast({
              title: error.message,
              variant: 'destructive'
            })
          });

          return;
        }


        toast({
          title: "Story Already Entered",
          variant: 'destructive'
        })
        return;
      }
      toast({
        title: 'Story Entered',
        variant: "default"
      })
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <DropdownMenuItem onClick={() => handleStorySelection(props.story.id, props.writeathonId)} className='cursor-pointer'>
        <div className='relative aspect-[3/4] h-16 p-2 object-cover overflow-hidden'>
          <img
            alt='Book Cover'
            src={props.story.cover || BookCover} 
            layout='fill'
            objectFit='cover'
          />
        </div>
        <span>{props.story.title}</span>
      </DropdownMenuItem>
    </>
  )
}

export default StorySelector