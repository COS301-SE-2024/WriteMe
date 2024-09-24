import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getStory } from '../../../../services/stories';
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@writeme/wmc';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@writeme/wmc/lib/ui/dropdown-menu';
import { HeartIcon, MessageCircle, MoreVertical } from 'lucide-react';
import dayjs from 'dayjs';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { IconFileLike } from '@tabler/icons-react';
import { CommentsIcon } from '@storybook/icons';
import ChaptersTableofContents from '../../../../components/chapters-toc';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
// import { Link } from 'next-view-transitions';

export interface WritePageProps {
  params: {
    story: string
  }
}

export default async function Page(props: WritePageProps) {
  const story = await getStory(props.params.story);
  return (
    <div>
      <LocalNavbar></LocalNavbar>

      <section className="flex">
        <Card className="">
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
              <CardDescription>Created: {dayjs(story.createdAt).format("MMM D, YYYY h:mm A")}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            {/*  IMage*/}
            <div className="relative aspect-[3/4] h-60 m-10">
              <img
                style={{
                  objectFit: 'contain'
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
            {}

            <Separator></Separator>

          </CardContent>
          <CardFooter>
          {/* TODO: Like comments*/}
            <HeartIcon></HeartIcon>
            <MessageCircle></MessageCircle>
          </CardFooter>

        </Card>
        <div className="flex flex-col gap-4 p-4 items-end">
          <div className="flex gap-4">
          <Button asChild>
            <Link href={`/myworks/${story.id}/write/new-chapter`}>Create new Chapter</Link>
          </Button>
          </div>
          <ChaptersTableofContents story={story}></ChaptersTableofContents>
        </div>
      </section>


    </div>
  );
}

