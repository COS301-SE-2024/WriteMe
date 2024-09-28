'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmojiPicker from 'emoji-picker-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@writeme/wmc/lib/ui/card';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@writeme/wmc/lib/ui/avatar';

import { Input } from '@writeme/wmc/lib/ui/input';

import { buttonVariants, Button } from '@writeme/wmc/lib/ui/button';

import { MessageSquare, Smile, Send, Cross, Reply, X } from 'lucide-react';
import { cn } from '@writeme/wmc/utils';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Separator } from '@writeme/wmc/lib/ui/separator';
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export interface CommentSectionProps {
  comments: any;
  storyId: string;
  chapterId?: string;
  fill?: boolean;
}

export default function CommentSection({
  comments,
  storyId,
  chapterId,
  fill = true,
}: CommentSectionProps) {
  dayjs.extend(relativeTime);
  const [input, setInput] = useState('');
  const [parent, setParent] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleComment = async () => {
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          content: input,
          storyId: storyId,
          chapterId: chapterId,
        }),
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
              variant: 'destructive',
            });
          });

          return;
        }

        toast({
          title: errorData.message,
          variant: 'destructive',
        });
        return;
      } else {
        const data = await res.json();
        router.refresh();
        setInput('');
        toast({
          title: 'Comment Created!',
        });
      }
    } catch (e: any) {}
  };

  return (
    <Card className={fill ? 'w-full' : ''}>
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex gap-2">
          <MessageSquare></MessageSquare> Comments
        </CardTitle>
      </CardHeader>
      <Separator></Separator>
      <CardContent className="flex flex-col">
        {comments.length == 0 ? (
          <>
            <span className="grow text-center items-center mt-4">
              Be the first to comment.
            </span>
          </>
        ) : (
          comments.map((c) => (
            <div>
              <div className="flex gap-2 items-start justify-start">
                <Avatar className="mt-3">
                  <AvatarImage src={c.author.image} />
                  <AvatarFallback>{c.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/user/${c.author.id}`}
                      className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
                    >
                      {c.author.name}
                    </Link>
                    <span>·</span>
                    <span className="text-primary text-sm">
                      {dayjs(c.createdAt).fromNow()}
                    </span>
                    <Button onClick={() => {
                      setParent(c.id);
                    }} variant={'ghost'} size={'icon'}><Reply className='size-1'/></Button>
                  </div>
                  <p className="rounded-tr-xl rounded-br-xl rounded-bl-2xl py-2 px-4 bg-accent w-fit">
                    {c.content}
                  </p>
                </div>
              </div>
              {/* Replies */}
              <div className="pl-4">
                <ol>
                  {/* {c.replies.map((r) => {
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="mt-3">
                        <AvatarImage src={r.author.image} />
                        <AvatarFallback>{r.author.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/user/${r.author.id}`}
                            className={cn(
                              buttonVariants({ variant: 'link' }),
                              'p-0'
                            )}
                          >
                            {r.author.name}
                          </Link>
                          <span>·</span>
                          <span className="text-primary text-sm">
                            {dayjs(r.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="rounded-tr-xl rounded-br-xl rounded-bl-2xl py-2 px-4 bg-accent w-fit">
                          {r.content}
                        </p>
                      </div>
                    </div>;
                  })} */}
                </ol>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <Separator></Separator>
      {/* TODO: wrap in session check */}
      <CardFooter className="flex justify-center items-center pt-6">
        {status == 'authenticated' ? (
          <div className="flex items-center gap-2 w-full justify-between">
            <Button variant="outline" size="icon">
              {/* <EmojiPicker></EmojiPicker> */}
              <Smile> </Smile>
            </Button>
            <Input
              fill={true}
              onChange={(value) => setInput(value.target.value)}
              value={input}
              className="grow w-full"
              type="text"
              placeholder="let us know your thoughts..."
            />
            <Button variant="outline" size="icon" onClick={handleComment}>
              <Send />
            </Button>
            {parent !== "" && (<Button size={'icon'} onClick={() => setParent("")} variant={"destructive"}><X className='size-2'/></Button>)}
          </div>
        ) : (
          <span className="grow text-center">Log In to Comment</span>
        )}
      </CardFooter>
    </Card>
  );
}
