"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { EditorContext } from './editor-context';

import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { BlockNoteEditor } from '@blocknote/core';

// interface LocalNavbarProps {
//   title: string;
//   // published: boolean;
//
// }




const LocalNavbar = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { story, setStory, blocks, setBlocks } = useContext(EditorContext);
  const [error, setError] = useState(false);

  const onSave = async (e) => {
    setError(false);
    e.preventDefault();
    const values = {
      ...story,
      blocks:blocks
    }


    try {
      setSubmitting(true);
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
      }
      toast({
        title: 'Saved Successfully',
        variant: "default"
      })

    } catch (error: any) {
      setError(true);
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false);
    }
  };


  const onPublish = async (e) => {
    setError(false);
    e.preventDefault();

    let content = await BlockNoteEditor.create({ initialContent: blocks }).blocksToHTMLLossy();

    const values = {
      ...story,
      blocks:blocks,
      content: content,
      published: true
    }


    try {
      setSubmitting(true);
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
      }
      toast({
        title: 'Published Successfully',
        variant: "default"
      })

      router.push(`/stories/${story.id}`);

    } catch (error: any) {
      setError(true);
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background sticky top-0 z-50 border-b h-16 flex p-2 items-center justify-between">
      <div className="flex items-center gap-4">
          <Link href="/myworks">
            <Button variant='secondary'><ArrowLeft></ArrowLeft></Button>
          </Link>
          <h2>{story.title}</h2>
        </div>
        <div className="flex gap-2">
          {/*<Button variant='default'> Preview </Button>*/}
          <Button variant='default' onClick={(e) => onSave(e)}> Save </Button>
          <Button variant='default' onClick={(e) => onPublish(e)}> Publish </Button>
        </div>
    </div>
  );
};

export default LocalNavbar;
