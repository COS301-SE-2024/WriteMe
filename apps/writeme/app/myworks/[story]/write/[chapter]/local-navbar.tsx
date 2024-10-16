"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@writeme/wmc';
import { ArrowLeft, Download, Ellipsis, History, Play, UsersRound, Link as LinkChain } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@writeme/wmc/lib/ui/sheet'
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@writeme/wmc/lib/ui/avatar';
import {Skeleton} from '@writeme/wmc/lib/ui/skeleton'
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useBlockNoteEditor } from '@blocknote/react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@writeme/wmc/lib/ui/dialog';
import { createSession, createViewableSession } from 'apps/writeme/services/client-services';
import { ToastAction } from '@writeme/wmc/lib/ui/toast';
dayjs.extend(relativeTime)
// interface LocalNavbarProps {
//   title: string;
//   // published: boolean;
//
// }


const VersionsSheet = ({chapterId}) => {
  const router = useRouter()
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [versions, setVersions] = useState([]);
  const {setBlocks} = useContext(EditorContext)
  const editor = useBlockNoteEditor();

  const getVersions = async (e) => {
    setError(false);
    // e.preventDefault();

    try {
      setSubmitting(true);
      const res = await fetch(`/api/versions?id=${chapterId}`, {
        method: 'GET',
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

      let version_json = await res.json();
      setVersions(version_json.versions.reverse())

      toast({
        title: 'Loaded Versions',
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

  const getVersionContent = async (time: string) => {
    setError(false);

    try {
      setSubmitting(true);
      const res = await fetch(`/api/versions/content?`+ new URLSearchParams({
        id: chapterId,
        time: time
      }).toString(), {
        method: 'GET',
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

      let version_json = await res.json();
      // @ts-ignore
      setBlocks(version_json.version.blocks);
      editor.replaceBlocks(editor.document, version_json.version.blocks)

      toast({
        title: 'Loaded Version Content',
        variant: "default"
      })

    } catch (error: any) {
      console.log(error)
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
    <Sheet>
  <SheetTrigger onClick={(e) => {
    getVersions(e)
  }}>
    <History></History>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Chapter Versions</SheetTitle>
      <SheetDescription>
        From here you can preview different versions of this chapter.
      </SheetDescription>
      <div className='flex flex-col gap-4'>

      {versions.map((v, i) => (
        <div className='flex rounded-lg items-center gap-2 h-8 w-full justify-between'>
          <Avatar className='h-[20px] w-[20px] size-4'>
            <AvatarFallback className='size-4'>{versions.length - i}</AvatarFallback>
          </Avatar>
          <p>
            {dayjs(v.createdAt).fromNow()}
          </p>
          <Button onClick={() => {
            getVersionContent(v.createdAt);
          }}>Load Version</Button>
        </div>
      ))}
      {submitting ? <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div> : <></>}
      </div>
    </SheetHeader>
  </SheetContent>
</Sheet>


  )
}




const LocalNavbar = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { chapter, setChapter, blocks, setBlocks } = useContext(EditorContext);
  const [error, setError] = useState(false);
  const editor = useBlockNoteEditor();

  const onLiveSessionCreate = async () => {
    try{
      const res = await createSession(chapter.id);
      toast({
        title: "Session Started",
        variant: "default"
      })
      console.log(res)
      router.push(`/s/e/${res.session}`)

    }catch (error: any){
      toast({
        title: 'Unable to create Session',
        variant: "default"
      })
    }
  }

  const onViewableSessionCreate = async () => {
    try{
      const res = await createViewableSession(chapter.id);
      console.log(res)
      toast({
        title: "Session Started",
        variant: "default"
      })


      router.push(`/s/v/${res.session}`)

    }catch (error: any){
      toast({
        title: 'Unable to create Session',
        variant: "default"
      })
    }
  }

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
    console.log(blocks);
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

    let content = await editor.blocksToHTMLLossy();

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

      toast({
        title: "Chapter Published Successfully",
        description: "Ensure that the story is pubished",
          action: <ToastAction onClick={() => router.push(`/myworks/${chapter.storyId}/edit`)} altText={'Go To Story Edit Page'}>Publish Story</ToastAction>
      })
      
      // router.push(`/stories/${chapter.storyId}/${chapter.id}`);

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
          <VersionsSheet chapterId={chapter.id}></VersionsSheet>
          <Link className='hidden md:flex' href={`/myworks/${chapter.storyId}/write/${chapter.id}/edit`}>
            <Button variant='default'> Edit </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='default'><UsersRound/> Share</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Live Collaboration</DialogTitle>
              </DialogHeader>
              <div className='flex flex-col items-center gap-2'>
                <p>Start a Session, in which you can invite your friends or anyone via a link to view and edit this chapter in real-time.</p>
                <Button variant='default' onClick={onLiveSessionCreate}><Play/> Start Session</Button>
                <p>Or</p>
                <p>Shareable link, a read only link to allow others to view your work without publishing.</p>
                <Button variant='default' onClick={onViewableSessionCreate}><LinkChain/> Viewer Link</Button>
              </div>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className='hidden md:flex' variant='default' onClick={(e) => onSave(e)}> Save </Button>
          <Button className='hidden md:flex' variant='default' onClick={(e) => onPublish(e)}> Publish </Button>
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


              {/* All Options for mobile devices */}

              <DropdownMenuItem className='flex md:hidden'>
                <Link href={`/myworks/${chapter.storyId}/write/${chapter.id}/edit`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex md:hidden' onClick={(e) => onSave(e)} >
                <span>Save</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='flex md:hidden' onClick={(e) => onPublish(e)} >
                <span>Publish</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
    </div>
  );
};

export default LocalNavbar;
