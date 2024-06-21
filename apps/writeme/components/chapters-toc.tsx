"use client";

import Image from "next/image"
import { MoreHorizontal, PenIcon } from 'lucide-react';

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

import {stories, chapters} from "../db/schema"
import dayjs from 'dayjs';
import Link from 'next/link';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { useRouter } from 'next/navigation';
type Story = typeof stories.$inferSelect;
type Chapter = typeof chapters.$inferSelect;
type StoryWithChapters = Story & {
  chapters: Chapter[]
}

export interface TOCProps{
  story: StoryWithChapters
}

export default function ChaptersTableofContents({story} : TOCProps) {
  const router = useRouter();


  return (
    <Card>
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
                {c.title}
              </TableCell>
              <TableCell>
                {c.published ? <Badge variant="default">Published</Badge> : <Badge variant="secondary">Draft</Badge>}
              </TableCell>
              <TableCell className="hidden md:table-cell">0</TableCell>
              <TableCell className="hidden md:table-cell">25</TableCell>
              <TableCell className="hidden md:table-cell">
                {dayjs(c.createdAt).format("MMM D, YYYY h:mm A")}
              </TableCell>
              <TableCell>
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
                    <DropdownMenuItem style={{cursor: 'pointer'}} onClick={() => router.push(`/myworks/${c.storyId}/write/${c.id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>)}
            {story.chapters.length == 0 ? <TableRow><TableCell className="text-center" colSpan={7}><div className="flex flex-col"> <span>There are currently No Chapters</span> <Link href={`/myworks/${story.id}/write/new-chapter`} className={buttonVariants({variant: "link"})}>Create first chapter!</Link></div></TableCell></TableRow> : <></>}

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
