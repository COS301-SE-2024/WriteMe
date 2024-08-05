// import styles from './page.module.css';
// import WriteMeLogo from '../../../assets/WriteMe.png';
// import Image from 'next/image';
// import Profile from '../../../assets/profile.jpg';
// import Book from '../../../assets/HarryPotter.png';
// import { Button, buttonVariants } from '@writeme/wmc';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@writeme/wmc';
// import { Bookmark, BookOpenText, Pencil } from 'lucide-react';
// import { Share } from 'lucide-react';
// import { Download } from 'lucide-react';
// import { ArrowUpRight } from 'lucide-react';
// import { getPublishedStory, getStory } from '../../../services/stories';
// import { Avatar, AvatarFallback, AvatarImage } from '@writeme/wmc/lib/ui/avatar';
// import { Link } from 'next-view-transitions'
// // import Link from 'next/link';
// import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
//
//
// export interface MyworksProps {
//   params: {
//     story: string
//   }
// }
//
// export default async function Write(props: MyworksProps) {
//   let story = await getStory(props.params.story);
//
//   return (
//     <div className="flex flex-col">
//       <LocalNavbar/>
//
//       <div className="flex flex-col items-center justify-center gap-10">
//
//       <div className='flex justify-center mt-4 gap-x-8'>
//         <div className="relative aspect-[3/4] h-60 m-8">
//           <img
//             style={{
//               objectFit: 'contain'
//             }}
//             src={story.cover}
//             alt="Book Image"
//             objectFit="contain"
//           />
//         </div>
//         <div className='flex flex-col justify-between'>
//           <h1 className='font-bold text-4xl'>{story.title}</h1>
//
//           <div className="flex gap-2 items-center">
//             <Avatar>
//               <AvatarImage src={story.author.image} alt={story.author.name}></AvatarImage>
//               <AvatarFallback>{story.author.name[0]}</AvatarFallback>
//             </Avatar>
//             <Link href={`/user/${story.author.id}`}>{story.author.name}</Link>
//           </div>
//
//           <p className='italic text-sm'>{story.brief}</p>
//
//           {/*<Button>Start reading <ArrowUpRight></ArrowUpRight></Button>*/}
//           <div className="flex gap-4">
//
//           <Button asChild variant="default">
//             <Link href={`/myworks/${story.id}/write/`}><div className="flex gap-1 items-center"><Pencil size='1rem' /> Write</div></Link>
//           </Button>
//           <Button asChild variant="default">
//             <Link href={`/stories/${story.id}`}><div className="flex gap-1 items-center"><BookOpenText size="1rem"/> Read</div></Link>
//           </Button>
//           </div>
//
//         </div>
//       </div>
//
//       <div className="flex justify-center items-center h-full"> {/* Centering container for the card */}
//         <Card className="w-full">
//           <CardHeader>
//             { story.description ?
//             <CardTitle>Description</CardTitle> : <></> }
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-center items-center h-full w-full"> {/* Centering container for card content */}
//               <div>
//                 <p>{story.description}</p>
//               </div>
//             </div>
//
//             <div className="flex flex-col">
//                 {story.chapters.map(chapter => {
//                   return (
//                      <div className="flex">
//                        <p>{chapter.title}</p>
//                      </div>
//                   )
//                 })}
//             </div>
//
//           </CardContent>
//           <CardFooter>
//             <div className="flex justify-center items-center h-full space-x-4"> {/* Centering container for card footer */}
//               <Bookmark></Bookmark>
//               <Share></Share>
//               <Download></Download>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//       </div>
//     </div>
//   );
// }

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
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/myworks/${story.id}/edit`}>Edit</Link>
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
                      <DeleteStoryDialog id={story?.id}></DeleteStoryDialog>
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
