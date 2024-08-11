'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  buttonVariants,
} from '@writeme/wmc';
import { Textarea } from '@writeme/wmc/lib/ui/textarea';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { ImprovGameDialog } from './improv-game';
import { useParams } from 'next/navigation';
import { useState, useContext } from 'react';
import { string } from 'zod';
import {UtilContext } from "./editor-utilities"
import { ChevronDown, Sparkles } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@writeme/wmc/lib/ui/dropdown-menu';
import { cn } from '@writeme/wmc/utils';


function PromptPad() {
    const params = useParams<{story: string, chapter: string}>();
    const {promptPadContent, setPromptPadContent} = useContext(UtilContext)


    const saveNote = async () => {
        try {
            const res = await fetch("/api/notes", {
              method: "POST",
              body: JSON.stringify({
                storyId: params.story,
                chapterId: params.chapter,
                content: promptPadContent
              }),
              headers: {
                'Content-Type': "application/json"
              }
            })
      
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
                title: errorData.message,
                variant: 'destructive'
              })
              return;
            }
      
            toast({
              title: "Prompt Saved",
              variant: "default"
            })
      
          }catch (error: any){
            toast({
              title: error.message,
              variant: "destructive"
            })
          }finally {
      
          }
    }


  return (
    <Card className='max-w-sm inline'>
      <CardHeader>
        <CardTitle>Prompt Pad</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="a place for your planning." value={promptPadContent} onChange={v => setPromptPadContent(v.target.value)}></Textarea>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className='flex -space-x-px'>
          <DropdownMenu>
          <Button className='rounded-r-none' onClick={saveNote}>Save Prompt</Button>
              <DropdownMenuTrigger className={cn(buttonVariants({variant: 'default'}), "rounded-l-none")}>
                <ChevronDown className='size-4'></ChevronDown>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                  localStorage.setItem(`pp-${params.chapter}`, promptPadContent)
                  toast({
                    title: 'Saved to Browser',
                    variant: "default"
                  })
                }}>Save to Browser Storage</DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={() => {
                  let content = localStorage.getItem(`pp-${params.chapter}`)
                  if (!content){
                    toast({
                      title: 'Nothing saved in Browser',
                      variant: "destructive"
                    })
                  }
                  setPromptPadContent(content)
                  toast({
                    title: 'Loaded from browser',
                    variant: "default"
                  })
                }}>
                  Load from Browser Storage
                </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ImprovGameDialog></ImprovGameDialog>
      </CardFooter>
    </Card>
  );
}

export default PromptPad;
