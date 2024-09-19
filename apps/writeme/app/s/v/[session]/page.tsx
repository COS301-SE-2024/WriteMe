import { getPublishedChapter } from 'apps/writeme/services/chapters';
import dynamic from 'next/dynamic';
import ChapterViewer from './chapter-viewer';
import {
  getViewableChapter,
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
import { LiveSessionControls, LiveSessionWrapper } from 'apps/writeme/components/live-session-context';
import WhiteBoard, { ExitWhiteBoardFullscreenButton } from 'apps/writeme/components/whiteboard';
import { VideoConferenceWithControls } from 'apps/writeme/components/live-discussion';
import CopyButton from '@writeme/wmc/lib/ui/copy-button';


const LocalNavbar = dynamic(() => import("@writeme/wmc/lib/ui/local-navbar"), {ssr: false})
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
  const v = await getViewableChapter(params.session);
  const owner = await isViewableSessionOwner(params.session);

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
    <div>
      <LiveSessionWrapper sessionId={params.session}>
        <LocalNavbar>
          <ExitWhiteBoardFullscreenButton></ExitWhiteBoardFullscreenButton>
        </LocalNavbar>
        <div className="flex justify-between p-4">
          <div className="w-[140ch]">
            <ChapterViewer blocks={v?.chapter.blocks}></ChapterViewer>
          </div>
          <div className="flex flex-col grow min-h-screen">
            <Card>
              <CardHeader>Shared Chapter</CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input readOnly placeholder="URL" value={`https://writeme.co.za/s/v/${params.session}`}/>
                    <CopyButton inputContent={`https://writeme.co.za/s/v/${params.session}`}></CopyButton>
                  </div>
                  {owner ? (
                    <div className="flex flex-col gap-2 p-2">
                      <p>This is your Viewable Session.</p>
                      <Button className="flex gap-1" variant={'destructive'}>
                        End Session
                      </Button>
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
            <LiveDiscussion room={params.session}>
              <VideoConferenceWithControls />
            </LiveDiscussion>
            <div className="h-96 flex">
              <WhiteBoard></WhiteBoard>
            </div>
          </div>
        </div>
      </LiveSessionWrapper>
    </div>
  );
}
