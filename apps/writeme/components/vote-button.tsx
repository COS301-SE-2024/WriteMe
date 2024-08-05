'use client'

import { Button } from '@writeme/wmc'
import React, { useState } from 'react'
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { Vote } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@writeme/wmc/lib/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem} from '@writeme/wmc/lib/ui/toggle-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@writeme/wmc/lib/ui/popover'

interface Category{
  id: string,
  category: string,
}

export interface VoteButtonProps {
  writeathonId: string,
  storyId: string,
  categories: Category[]
}

const VoteButton = (props: VoteButtonProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleVote = async (writeathonId: string, storyId: string, categories: any) => {
    try {
      const response = await fetch('/api/votes', {
        method: 'POST', 
        body: JSON.stringify({ writeathonId: writeathonId, storyId: storyId, categories: selectedCategories }),
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
    
    } catch (e: any) {
      toast({
        title: e.message,
        variant: "destructive"
      })
    }
  }

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  return (
    <div className='grid grid-cols-2'>
      <Popover>
        <PopoverTrigger>
            <Button variant='default'>
              <Vote />
              Vote
            </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ToggleGroup className='grid grid-cols-2' type="multiple">
            {props.categories.map((category) => (
              <ToggleGroupItem
                value={category.id}
                aria-pressed={selectedCategories.includes(category.id)}
                onClick={() => handleToggleCategory(category.id)}
              >
                {category.category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button
            variant='default'
            onClick={() => handleVote(props.writeathonId, props.storyId, selectedCategories)}
          >
            Submit Vote
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default VoteButton
