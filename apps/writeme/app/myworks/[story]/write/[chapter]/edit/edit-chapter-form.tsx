'use client';

import { useRouter } from 'next/navigation';
import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form';
import { EditChapterInput, editChapterSchema } from '../../../../../../db/chapter-schema';
import { Button } from '@writeme/wmc';
import { chapters } from '../../../../../../db/schema';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { Link } from 'next-view-transitions';

type Chapter = typeof chapters.$inferSelect;
export interface EditChapterFormProps {
  chapter: Chapter
}

export default function EditChapterForm(props: EditChapterFormProps) {
  const router = useRouter();


  const handleUpdate = async (data: EditChapterInput) => {

    try {
      console.log(data)
      const res = await fetch('/api/chapter', {
        method: 'PUT',
        body: JSON.stringify(data),
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
      }
      toast({
        title: 'Chapter Updated',
        variant: "default"
      })

      router.push(`/myworks/${props.chapter.storyId}`);
      // router.refresh()

    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      })
    }
  };

  return (

    <AutoForm
      formSchema={editChapterSchema}
      onSubmit={(data) => {
        handleUpdate(data)
      }}
      values={{
        title: props.chapter.title,
        description: props.chapter.description,
        published: props.chapter.published,
        brief: props.chapter.brief
      }}
    >

      <div className="flex justify-evenly">
        <Button asChild variant="destructive">
          <Link href={`/myworks/${props.chapter.storyId}/write/${props.chapter.id}`}>Cancel</Link>
        </Button>
        <AutoFormSubmit>Update Chapter</AutoFormSubmit>
      </div>
    </AutoForm>
  );
}
