'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateStorySchema } from '../../../../db/story-schema';
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
import { FancyMultiSelect, type Framework } from '@writeme/wmc/lib/ui/fancy-multi-select';
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger} from '@writeme/wmc/lib/ui/multi-select';
import { signIn } from 'next-auth/react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Switch } from '@writeme/wmc/lib/ui/switch';

export interface Genre {id: string, genre: string}

export interface EditStoryFormProps{
  id: string,
  title: string,
  brief: string,
  description: string,
  published: boolean,
  exportable: boolean,
  genreItems: Genre[],
  selectedGenres: any[],
}

const EditStoryForm = ({id, title, brief, description, genreItems, selectedGenres, published, exportable}: EditStoryFormProps) => {
  const form = useForm<z.infer<typeof updateStorySchema>>({
    resolver: zodResolver(updateStorySchema),
    defaultValues: {
      id: id,
      brief: brief,
      title: title,
      description: description,
      genre: selectedGenres ? selectedGenres.map(g => g.genreId) : [],
      published: published,
      exportable: exportable,
    }
  });

  const { register } = form;

  const router = useRouter();




  async function onSubmit(values: z.infer<typeof updateStorySchema>){
    try {
      // console.log(values);
      // setSubmitting(true);
      const res = await fetch('/api/story', {
        method: 'PUT',
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
        toast({
          title: "Story Updated",
        })
        router.back();
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
                <Input placeholder={"A really good title"} {...field}></Input>
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
          render={({field}) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Published
                    </FormLabel>
                    <FormDescription>
                      Specifies if the story is visible to the public.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
          )}
          name='published'
        >

        </FormField>

        <FormField 
          control={form.control}
          render={({field}) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Exportable
                    </FormLabel>
                    <FormDescription>
                      Will allow published works to be downloaded as a PDF if enabled.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
          )}
          name='exportable'
        >

        </FormField>

        <FormField
          control={form.control}
          render={({field})=> (
            <FormItem>
              <FormLabel>Brief</FormLabel>
              <FormControl>
                <Textarea placeholder={"short, sweet, impactful"} {...field}></Textarea>
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

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres</FormLabel>
              <MultiSelector onValuesChange={field.onChange} values={field.value}>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select Genres" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {genreItems.map(g => (
                    <MultiSelectorItem value={g.id}>{g.genre}</MultiSelectorItem>
                  ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
               </MultiSelector>
            </FormItem>
          )}
        >
        </FormField>
        <FormMessage>{form.formState.isValid}</FormMessage>
        <div className='flex justify-between'>
          <Button onClick={() => router.back()} variant='destructive'>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditStoryForm;
