"use client";

import Image from "next/image"
import { Bookmark, Download, HeartIcon, MoreHorizontal, PenIcon, Share } from 'lucide-react';

import { Badge } from "@writeme/wmc/lib/ui/badge"
import { Button, buttonVariants } from '@writeme/wmc/lib/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@writeme/wmc/lib/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@writeme/wmc/lib/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@writeme/wmc/lib/ui/table"

import { stories, chapters, likes, StoryWithChaptersAndLikes } from '../db/schema';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { useRouter } from 'next/navigation';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';
import LikeButton from './like-button';
import ExportButton from './export-button';


export interface TOCProps{
  story: StoryWithChaptersAndLikes,
  viewer?: boolean
}

export default function ChaptersTableofContents({story, viewer = false} : TOCProps) {
  const router = useRouter();


  return (
    <Card id="chapters-toc">
      <CardHeader>
        <CardTitle>Chapters</CardTitle>
        <CardDescription>
          Chapters of {story.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="hidden md:table-cell">Likes</TableHead>
              <TableHead className="hidden md:table-cell">
                Comments
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {story.chapters.map((c) => <TableRow key={c.id}>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt={c.title}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={c.cover}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                <Button asChild variant="link">
                  <Link href={viewer ? `/stories/${story.id}/${c.id}` : `/myworks/${story.id}/write/${c.id}` }>
                    {c.title}
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                {c.published ? <Badge variant="default">Published</Badge> : <Badge variant="secondary">Draft</Badge>}
              </TableCell>
              <TableCell className="hidden md:table-cell">{c.likes.length}</TableCell>
              <TableCell className="hidden md:table-cell">{c.comments.length}</TableCell>
              <TableCell className="hidden md:table-cell">
                {dayjs(c.createdAt).format("MMM D, YYYY h:mm A")}
              </TableCell>
              <TableCell>
                {viewer ? <div className="flex gap-1 items-center"> <LikeButton storyId={c.storyId} chapterId={c.id}></LikeButton> <Bookmark></Bookmark> <ShareStory link={`https:/writeme.co.za/stories/${c.storyId}/${c.id}`} message={`check out ${c.title}`}></ShareStory> <ExportButton storyId={c.storyId} chapterId={c.id}></ExportButton> </div> :
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Separator></Separator>
                    <DropdownMenuItem style={{cursor: 'pointer'}} onClick={() => router.push(`/myworks/${c.storyId}/write/${c.id}/edit`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>}
              </TableCell>
            </TableRow>)}
            {story.chapters.length == 0 ? <TableRow><TableCell className="text-center" colSpan={7}><div className="flex flex-col"> <span>There are currently No Chapters</span> <Link id="toc-create-chapter" href={`/myworks/${story.id}/write/new-chapter`} className={buttonVariants({variant: "link"})}>Create first chapter!</Link></div></TableCell></TableRow> : <></>}

          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/*<div className="text-xs text-muted-foreground">*/}
        {/*  Showing <strong>1-10</strong> of <strong>32</strong> products*/}
        {/*</div>*/}
      </CardFooter>
    </Card>
  )
}
