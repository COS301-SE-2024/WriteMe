'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateStorySchema, updateWriteathonSchema } from '../../../../db/story-schema';
import { z } from 'zod';

import { Button, Input } from '@writeme/wmc';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Switch } from '@writeme/wmc/lib/ui/switch';
import { editChapterSchema } from '../../../../db/chapter-schema';
import Link from 'next/link';
import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form';

export interface Genre {
  id: string;
  genre: string;
}

export interface EditStoryFormProps {
  id: string;
  title: string;
  brief: string;
  description: string;
  startDate: Date;
  endDate: Date;

}

const EditWriteathonForm = ({
  id,
  title,
  brief,
  description,
  startDate,
  endDate
}: EditStoryFormProps) => {
  const form = useForm<z.infer<typeof updateWriteathonSchema>>({
    resolver: zodResolver(updateWriteathonSchema),
    defaultValues: {

    },
  });

  const { register } = form;

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof updateWriteathonSchema>) {
    try {
      // console.log(values);
      // setSubmitting(true);
      const res = await fetch('/api/writeathon', {
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
              variant: 'destructive',
            });
          });

          return;
        }

        toast({
          title: errorData.message,
          variant: 'destructive',
        });
        return;
      } else {
        const { story } = await res.json();
        toast({
          title: 'Story Updated',
        });
        router.back();
      }
    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    } finally {
      // setSubmitting(false);
    }
  }

  return (
    <AutoForm
      formSchema={updateWriteathonSchema}
      onSubmit={(data) => {
        onSubmit(data)
      }}
      values={{
        id: id,
        brief: brief,
        title: title,
        description: description,
        endDate: endDate,
        startDate: startDate
      }}
      fieldConfig={{
        brief: {
          fieldType: "textarea"
        },
        description: {
          fieldType: "textarea"
        },
        startDate: {
          fieldType: 'datetime',
        },
        endDate: {
          fieldType: 'datetime',
        },
      }}
    >
      <div className="flex justify-evenly">
        <Button asChild variant="destructive">
          <Link href={`/writeathons`}>Cancel</Link>
        </Button>
        <AutoFormSubmit>Update Writeathon</AutoFormSubmit>
      </div>
    </AutoForm>
  );
};

export default EditWriteathonForm;
