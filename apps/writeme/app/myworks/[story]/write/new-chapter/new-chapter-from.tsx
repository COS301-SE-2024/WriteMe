/* v8 ignore start */
'use client';

import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form';
import { createChapterSchema } from '../../../../../db/chapter-schema';
import { Button, Card, CardHeader, Input } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation';
import { FormControl, FormItem } from '@writeme/wmc/lib/ui/form';
import { useEffect } from 'react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import type {NewChapter} from '../../../../api/chapter/route';

interface NewChapterFormProps {
  story: string;
}

export default async function NewChapterFrom(props: NewChapterFormProps) {
  const router = useRouter();

  // useEffect(() => {
  //   console.log(props.story)
  // }, []);

  // @ts-ignore

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/chapter", {
        method: "POST",
        body: JSON.stringify(data),
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
      const chapter: NewChapter = await res.json();
      router.push(`/myworks/${props.story}/write/${chapter.id}`)

    }catch (error: any){
      toast({
        title: error.message,
        variant: "destructive"
      })
    }finally {

    }
  }

  return (
    <div className="flex items-center min-h-screen">
      <div className="flex flex-col w-full px-4">
        <Card className="w-full max-w-[80ch]">
          <CardHeader className="bg-muted/50">
            <h1 className="font-bold text-2xl text-center">Create a new Chapter</h1>
          </CardHeader>
          <Separator className="mb-4" />
          <div className="p-8" id="new-chapter-form">
            <AutoForm
              onSubmit={handleSubmit}
              formSchema={createChapterSchema}
              values={{ storyId: props.story }}
              fieldConfig={{
                values: {
                  storyId: props.story
                },
                storyId: {
                  inputProps: {
                    type: 'hidden'
                  },
                  fieldType: ({label, isRequired, field, fieldConfigItem, fieldProps}) => (
                    <FormItem>
                      <FormControl>
                        {/*<Input type="hidden" id="storyId" name="storyId" value={field.value}></Input>*/}
                        <input type="hidden" id="storyId" name="storyId" value={field.value} />
                      </FormControl>
                    </FormItem>
                  ),
                },
                description: {
                  fieldType: 'textarea'
                }
              }}
            >
              <div className="flex justify-between">
                <Button variant="destructive" onClick={() => router.back()}>Cancel</Button>
                <AutoFormSubmit id="new-chapter-submit"></AutoFormSubmit>
              </div>
            </AutoForm>
          </div>
        </Card>
      </div>
    </div>
  );
}
