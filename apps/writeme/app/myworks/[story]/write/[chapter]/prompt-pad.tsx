'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
} from '@writeme/wmc';
import { Textarea } from '@writeme/wmc/lib/ui/textarea';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { ImprovGameDialog } from './improv-game';
import { useParams } from 'next/navigation';
import { useState, useContext } from 'react';
import { string } from 'zod';
import {UtilContext } from "./editor-utilities"


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
              title: "Chapter Created",
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
    <Card>
      <CardHeader>
        <CardTitle>Prompt Pad</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="a place for your planning." value={promptPadContent} onChange={v => setPromptPadContent(v.target.value)}></Textarea>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button onClick={saveNote}>Save Prompt</Button>
        <ImprovGameDialog></ImprovGameDialog>
      </CardFooter>
    </Card>
  );
}

export default PromptPad;
