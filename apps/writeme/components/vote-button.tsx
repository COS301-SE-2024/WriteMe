'use client'

import { Button } from '@writeme/wmc'
import React, { useState } from 'react'
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { ArrowBigUp } from 'lucide-react';

export interface VoteButtonProps {
  storyId: string,
  voted: boolean
}

const VoteButton = (props: VoteButtonProps) => {
  const [isVoted, setIsVoted] = useState(props.voted)

  const handleVote = async (storyId: string) => {
    try {
      const response = await fetch('/api/votes', {
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
      setIsVoted(!isVoted)
    
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Button onClick={() => handleVote(props.storyId)} variant='ghost' size='icon'>
        <ArrowBigUp fill={isVoted ? 'black' : 'transparent'} />
      </Button>
    </>
  )
}

export default VoteButton