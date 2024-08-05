"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { ArrowLeft, Download, Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { EditorContext } from './editor-context';

import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { BlockNoteEditor } from '@blocknote/core';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@writeme/wmc/lib/ui/dropdown-menu';

// interface LocalNavbarProps {
//   title: string;
//   // published: boolean;
//
// }




const LocalNavbar = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { chapter, setChapter, blocks, setBlocks } = useContext(EditorContext);
  const [error, setError] = useState(false);


  const exportPdf = async ()=> {
    const pdfWindow = window.open('about:blank');
    try {
      const res = await fetch('/api/export/chapter', {
        method: 'POST',
        body: JSON.stringify({ id: chapter.id }),
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
        title: 'Exported Successfully',
        variant: "default"
      })

      // @ts-ignore
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      pdfWindow.location.href = url; // and here, we finally forward the data to the new window
      pdfWindow.focus();
    }catch (e) {
      pdfWindow.close();
    }
  }

  const onSave = async (e) => {
    setError(false);
    e.preventDefault();
    const values = {
      ...chapter,
      blocks:blocks
    }


    try {
      setSubmitting(true);
      const res = await fetch('/api/chapter', {
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
      ...chapter,
      blocks:blocks,
      content: content,
      published: true
    }


    try {
      setSubmitting(true);
      const res = await fetch('/api/chapter', {
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

      router.push(`/stories/${chapter.storyId}/${chapter.id}`);

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
          <Link href={`/myworks/${chapter.storyId}/`}>
            <Button variant='secondary'><ArrowLeft></ArrowLeft></Button>
          </Link>
          <h2>{chapter.title}</h2>
        </div>
        <div className="flex gap-2">
          {/*<Button variant='default'> Preview </Button>*/}
          <Link href={`/myworks/${chapter.storyId}/write/${chapter.id}/edit`}>
            <Button variant='default'> Edit </Button>
          </Link>
          <Button variant='default' onClick={(e) => onSave(e)}> Save </Button>
          <Button variant='default' onClick={(e) => onPublish(e)}> Publish </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Ellipsis></Ellipsis>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Other Options</DropdownMenuLabel>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem onClick={() => exportPdf()} >
                <Download className="mr-2 h-4 w-4"></Download>
                <span>Export PDF</span>
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
    </div>
  );
};

export default LocalNavbar;
