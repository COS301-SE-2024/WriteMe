'use client'

import { Button } from '@writeme/wmc'
import React, { useState } from 'react'
import { toast } from '@writeme/wmc/lib/ui/use-toast';

export interface FollowButtonProps {
  userId: string,
  following: boolean
}

const FollowButton = (props: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(props.following)

  const handleFollow = async (userId: string) => {
    try {
      const response = await fetch('/api/follow', {
        method: 'POST', 
        body: JSON.stringify({ userId: userId }),
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
      setIsFollowing(!isFollowing)
    
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <Button onClick={() => handleFollow(props.userId)} className='mx-12 mb-3' variant='default'>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}

export default FollowButton