import { getPublishedChapter } from 'apps/writeme/services/chapters';
import dynamic from 'next/dynamic';
import {
  getEditableChapter,
  getViewableChapter,
  isLiveSessionOwner,
  isViewableSessionOwner,
} from 'apps/writeme/services/sessions';
// import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@writeme/wmc';
import Link from 'next/link';
import Image from 'next/image';
import NotFountImage from '../../../../assets/not_found.svg';
import {
  LiveSessionControls,
  LiveSessionWrapper,
} from 'apps/writeme/components/live-session-context';
import { ExitWhiteBoardFullscreenButton } from 'apps/writeme/components/whiteboard';
import { VideoConferenceWithControls } from 'apps/writeme/components/live-discussion';
import CopyButton from '@writeme/wmc/lib/ui/copy-button';
import { Suspense } from 'react';
import LoaderSpinner from 'apps/writeme/components/loader-spinner';
import DeleteSessionButton from '../../DeleteSessionButton';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@writeme/wmc/lib/ui/resizable';
import {ServerBlockNoteEditor} from "@blocknote/server-util"
import { ScrollArea } from '@writeme/wmc/lib/ui/scroll-area';

const LocalNavbar = dynamic(() => import("@writeme/wmc/lib/ui/local-navbar"), {ssr:false})
const CollabEditorWrapper = dynamic(() => import('./CollabEditor'), {
  ssr: false,
});
const WhiteBoard = dynamic(() => import('apps/writeme/components/whiteboard'), {
  ssr: false,
});

const LiveDiscussion = dynamic(
  () => import('apps/writeme/components/live-discussion'),
  { ssr: false }
);

export interface ChapterProps {
  params: {
    session: string;
  };
}

export default async function Page({ params }: ChapterProps) {
  const v = await getEditableChapter(params.session);

  // const server_editor = ServerBlockNoteEditor.create(v.chapter.blocks);
  // console.log(server_editor)

  const owner = await isLiveSessionOwner(params.session);

  if (!v) {
    return (
      <div>
        <LocalNavbar></LocalNavbar>

        <div className="w-screen h-screen flex justify-center items-center">
          <Card>
            <CardHeader>
              <CardTitle>
                The session that you are looking for does not exist or has
                ended...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image alt="Not Found Image" src={NotFountImage}></Image>
              <Button asChild variant="default" size="lg">
                <Link href="/">Home</Link>
              </Button>
            </CardContent>
            <CardFooter>
              <div className="text-xs">
                <a href="https://storyset.com/web">
                  Web illustrations by Storyset
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <LiveSessionWrapper sessionId={params.session}>
        <LocalNavbar>
          <ExitWhiteBoardFullscreenButton></ExitWhiteBoardFullscreenButton>
        </LocalNavbar>

        <ResizablePanelGroup
          direction="horizontal"
          className="w-full grow rounded-lg border"
        >
          <ResizablePanel defaultSize={75}>
            <div className="w-full p-2">
              <Suspense fallback={<LoaderSpinner />}>
              <ScrollArea className='h-screen'>
                <CollabEditorWrapper
                  inputBlocks={v.chapter.blocks}
                  sessionId={v.id}
                  chapterId={v.chapter.id}
                  owner={owner}
                  chapter={v.chapter}
                  />
                  </ScrollArea>
              </Suspense>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={35}>
                <div className="flex h-full items-center justify-center p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{v.chapter.title}</CardTitle>
                      <CardDescription>Shared Chapter</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                          <Input
                            readOnly
                            placeholder="URL"
                            value={`https://writeme.co.za/s/e/${params.session}`}
                          />
                          <CopyButton
                            inputContent={`https://writeme.co.za/s/e/${params.session}`}
                          ></CopyButton>
                        </div>
                        {owner ? (
                          <div className="flex flex-col gap-2 p-2">
                            <p>This is your Live Session.</p>
                            <DeleteSessionButton sessionType={"editable"} id={params.session}/>
                          </div>
                        ) : (
                          <p className="p-2">
                            {v?.user.name} has shared a chapter with you.
                          </p>
                        )}
                        <LiveSessionControls></LiveSessionControls>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={35}>
                <div className="flex h-full items-center justify-center p-6">
                  <LiveDiscussion room={params.session}>
                    <VideoConferenceWithControls />
                  </LiveDiscussion>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <div className="flex h-full items-center justify-center p-6">
                  <WhiteBoard></WhiteBoard>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </LiveSessionWrapper>
    </div>
  );
}
