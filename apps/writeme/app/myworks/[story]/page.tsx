import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getStory } from '../../../services/stories';
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@writeme/wmc/lib/ui/dropdown-menu';
import { HeartIcon, MessageCircle, MoreVertical } from 'lucide-react';
import dayjs from 'dayjs';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { IconFileLike } from '@tabler/icons-react';
import { CommentsIcon } from '@storybook/icons';
import ChaptersTableofContents from '../../../components/chapters-toc';
import Link from 'next/link';
// import { Link } from 'next-view-transitions';
import CommentSection from '../../../components/comments-sections';
import { DeleteStoryDialog } from './delete-story-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@writeme/wmc/lib/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';

export const dynamic = 'force-dynamic';

export interface WritePageProps {
  params: {
    story: string;
  };
}

export default async function Page(props: WritePageProps) {
  const story = await getStory(props.params.story);
  return (
    <div>
      <LocalNavbar></LocalNavbar>

      <Breadcrumb className='px-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/myworks">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{story.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


      <section className="flex flex-col md:flex-row">
        <Card className="max-w-md" id="my-story">
          <CardHeader className="flex flex-row items-start bg-muted/50 gap-1">
            <div className="grid gap-1">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {story.title}
                {/*<Button*/}
                {/*  size="icon"*/}
                {/*  variant="outline"*/}
                {/*  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"*/}
                {/*>*/}
                {/*  <Copy className="h-3 w-3" />*/}
                {/*  <span className="sr-only">Copy Link</span>*/}
                {/*</Button>*/}
              </CardTitle>
              <CardDescription>
                Created: {dayjs(story.createdAt).format('MMM D, YYYY h:mm A')}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      {/* <span className="sr-only">More</span> */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link className='w-full' href={`/myworks/${story.id}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <AlertDialogTrigger>Delete</AlertDialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your story.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <DeleteStoryDialog id={story?.id as string}></DeleteStoryDialog>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </DropdownMenu>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent>
            {/*  IMage*/}
            <div className="relative aspect-[3/4] h-60 m-10 flex justify-center">
              <img
                style={{
                  objectFit: 'contain',
                }}
                src={story.cover}
                alt="Book Image"
                objectFit="contain"
              />
            </div>

            <h3 className="font-bold">Brief:</h3>
            <p>{story.brief ? story.brief : 'No brief'}</p>
            <h3 className="font-bold">Description:</h3>
            <p>{story.description ? story.description : 'No description'}</p>

            <Separator></Separator>
          </CardContent>
          <CardFooter className="flex justify-around">
            {/* TODO: Like comments*/}
            <span className="flex gap-1">
              <HeartIcon></HeartIcon> {story.likes.length}
            </span>
            <span className="flex gap-1">
              {' '}
              <MessageCircle></MessageCircle> {story.comments.length}{' '}
            </span>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-4 p-4 items-end">
          <div className="flex gap-4">
            <Button asChild>
              <Link href={`/myworks/${story.id}/write/new-chapter`}>
                Create new Chapter
              </Link>
            </Button>
          </div>
          <ChaptersTableofContents story={story}></ChaptersTableofContents>
          <CommentSection
            storyId={story?.id as string}
            comments={story.comments}
          ></CommentSection>
        </div>
      </section>
    </div>
  );
}
