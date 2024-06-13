'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createStorySchema } from '../../../db/story-schema';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@writeme/wmc/lib/ui/form';
import { Button, Input } from '@writeme/wmc';
import { Textarea } from '@writeme/wmc/lib/ui/textarea';
import { signIn } from 'next-auth/react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { useRouter } from 'next/navigation';

const NewStoryForm = () => {
  const form = useForm<z.infer<typeof createStorySchema>>({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      brief: "",
      title: "",
      description: "",
    }
  });

  const router = useRouter();




  async function onSubmit(values: z.infer<typeof createStorySchema>){
    try {
      // setSubmitting(true);
      const res = await fetch('/api/story', {
        method: 'POST',
        body: JSON.stringify(values),
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
          title: errorData.message,
          variant: 'destructive'
        })
        return;
      }else {
        const { story } = await res.json();
        router.push(`/myworks/${story.id}/write/${story.id}`)
      }

    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      // setSubmitting(false);
    }

  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto max-w-sm mt-8">
        <FormField
          control={form.control}
          render={({field})=> (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input id="onborda-new-story-title" placeholder={"A really good title"} {...field}></Input>
              </FormControl>
              <FormDescription>
                This is the title of your story.
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
          name="title"
        >
        </FormField>

        <FormField
          control={form.control}
          render={({field})=> (
            <FormItem>
              <FormLabel>Brief</FormLabel>
              <FormControl>
                <Input placeholder={"short, sweet, impactful"} {...field}></Input>
              </FormControl>
              <FormDescription>
                A very short description of your story.
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
          name="brief"
        >
        </FormField>

        <FormField
          control={form.control}
          render={({field})=> (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A slightly longer description of your story, to give the reader a feel for it." {...field}></Textarea>
              </FormControl>
              <FormDescription>
                A longer description of your story.
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
          name="description"
        >
        </FormField>

        <Button id="onborda-new-story-create" type="submit">Create Story</Button>
      </form>
    </Form>
  );
};

export default NewStoryForm;
