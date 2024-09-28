import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import React from 'react';
import WriteMeLogo from '../../../assets/WriteMe.png';
import Image from 'next/image';
import Profile from '../../../assets/profile.jpg';
import Book from '../../../assets/HarryPotter.png';
import { Button, buttonVariants } from '@writeme/wmc';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc';
import { Bookmark, BookOpenText, Pencil } from 'lucide-react';
import { Share } from 'lucide-react';
import { Download } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { getPublishedStory, getStory } from '../../../services/stories';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@writeme/wmc/lib/ui/avatar';
// import { Link } from 'next-view-transitions';
import Link from 'next/link';
import ChaptersTableofContents from '../../../components/chapters-toc';
import CommentSection from '../../../components/comments-sections';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';
import LikeButton from '../../../components/like-button';
import ExportButton from '../../../components/export-button';
import BookmarkButton from 'apps/writeme/components/bookmark-button';
import { isBookmarked } from 'apps/writeme/services/users';
import { auth } from 'apps/writeme/auth';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
// import Link from 'next/link';

export const metadata = {
  title: 'Chapter | WriteMe',
  description: '',
};

/* eslint-disable-next-line */
export interface StoryProps {
  params: {
    story: string;
  };
}

export default async function Story(props: StoryProps) {
  const session = await auth();

  const story = await getPublishedStory(props.params.story);
  const bookmarked = await isBookmarked(
    session?.user?.id as string,
    props.params.story
  );

  // console.log(story.liked)
  return (
    <div>
      <LocalNavbar></LocalNavbar>
      {/* <div className="flex justify-center py-4  flex-col items-center">
        <div className="flex flex-col items-center max-w-[70ch]">

        <h1 className="text-4xl">{story.title}</h1>

        <div className="flex flex-col gap-1 text-lg" dangerouslySetInnerHTML={{__html: story.content}}>

        </div>
        </div>

      </div> */}
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col md:flex-row justify-center mt-4 gap-x-8">
          <div className="relative aspect-[3/4] h-60 m-8">
            <img
              style={{
                objectFit: 'contain',
              }}
              src={story.cover || ''}
              alt="Book Image"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <h1 className="font-bold text-4xl">{story.title}</h1>

            <div className="flex gap-1 items-center">
              <Avatar>
                <AvatarImage
                  src={story.author.image}
                  alt={story.author.name}
                ></AvatarImage>
                <AvatarFallback>{story.author.name[0]}</AvatarFallback>
              </Avatar>
              <Button asChild variant="link">
                <Link href={`/user/${story.author.id}`}>
                  {story.author.name}
                </Link>
              </Button>
            </div>

            <p className="italic text-sm">{story.brief}</p>

            {/*<Button>Start reading <ArrowUpRight></ArrowUpRight></Button>*/}
            <div className="flex justify-center items-center gap-4">
              {' '}
              {/* Centering container for card footer */}
              <div>
                <LikeButton storyId={story.id} liked={story.liked}></LikeButton>
                {story?.likes.length}
              </div>
              {/*<Bookmark></Bookmark>*/}
              <ShareStory
                link={`https://writeme.co.za/stories/${story.id}`}
                message={`Check out ${story.title}`}
              ></ShareStory>
              <ExportButton storyId={story.id}></ExportButton>
              <BookmarkButton
                storyId={story.id}
                bookmarked={bookmarked}
              ></BookmarkButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-start h-full w-full">
          {' '}
          {/* Centering container for the card */}
          <div className='w-full md:w-1/2'>
            <ChaptersTableofContents
            viewer={true}
            story={story}
          ></ChaptersTableofContents>
          </div>
          <CommentSection
            comments={story.comments}
            storyId={story.id}
            fill={false}
          ></CommentSection>
        </div>
      </div>
    </div>
  );
}
