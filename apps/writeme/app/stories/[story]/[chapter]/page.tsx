import { getPublishedChapter } from '../../../../services/chapters';
import ChapterViewer from './chapter-viewer';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@writeme/wmc';
// import { Link } from 'next-view-transitions';
import Link from "next/link"
import { ArrowLeft } from 'lucide-react';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';
import CommentSection from '../../../../components/comments-sections';
import LikeButton from '../../../../components/like-button';
import ExportButton from '../../../../components/export-button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
import { notFound } from 'next/navigation';

export interface ChapterProps {
  params: {
    story: string;
    chapter: string;
  };
}

export default async function Chapter({params}: ChapterProps){
  const chapter = await getPublishedChapter(params.chapter);

  if (!chapter || !chapter.story.published) {
    notFound();
  }

  return (
    <div>
      <LocalNavbar></LocalNavbar>
        <div className="flex flex-col md:flex-row relative justify-between">
        <div>
          <Card className="sticky top-0">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-1">
                <Button size="icon" variant="ghost">
                  <Link href={`/stories/${chapter.storyId}`}>
                    <ArrowLeft></ArrowLeft>
                  </Link>
                </Button>
                <Link href={`/stories/${chapter.storyId}`}>
                  {chapter.story.title}
                </Link>
              </CardTitle>
              <CardDescription>
                <span>{chapter.title}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[3/4] h-60 m-10 overflow-hidden">
                <img
                  style={{
                    objectFit: 'contain'
                  }}
                  src={chapter.cover}
                  alt="Book Image"
                  objectFit="contain"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-around">
              <ShareStory link={`https://writeme.co.za/stories/${chapter.storyId}/${chapter.id}`} message={`Check out ${chapter.title}`}></ShareStory>
              <LikeButton storyId={chapter.storyId} chapterId={chapter.id}></LikeButton>
              <ExportButton exportable={true} storyId={chapter.storyId} chapterId={chapter.id}></ExportButton>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-[70ch]"><ChapterViewer blocks={chapter.blocks}></ChapterViewer></div>
        <CommentSection comments={chapter.comments} storyId={chapter.storyId} chapterId={chapter.id} fill={false}></CommentSection>
      </div>

    </div>
  )

}
