"use client";

import React from "react";

import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@writeme/wmc/lib/ui/card";

  import {
    Avatar, 
    AvatarImage,
    AvatarFallback
} from "@writeme/wmc/lib/ui/avatar";

import {
    Input
} from "@writeme/wmc/lib/ui/input";

import {
    buttonVariants,
    Button
} from "@writeme/wmc/lib/ui/button";


import { MessageSquare, Smile, Send } from 'lucide-react';
import { cn } from '@writeme/wmc/utils';
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Separator } from "@writeme/wmc/lib/ui/separator";


export default function CommentSection() {
    let story: any = { comments : []}
    story.comments  = [{author: {username: "John Doe", image: "https://avatars.githubusercontent.com/u/72245642?v=4", id: "some long string", createdAt: new Date('December 17, 1995 03:24:00')}, content: "Hello there"}, {author: {username: "John Doe", image: "https://avatars.githubusercontent.com/u/72245642?v=4", id: "some long string", createdAt: new Date('June 13, 2024 03:24:00')}, content: "Hello there"},{author: {username: "John Doe", image: "https://avatars.githubusercontent.com/u/72245642?v=4", id: "some long string"}, content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptate, labore maiores, ullam accusantium facere aliquam neque ipsum sit impedit ratione officiis adipisci libero corporis earum optio soluta similique temporibus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptate, labore maiores, ullam accusantium facere aliquam neque ipsum sit impedit ratione officiis adipisci libero corporis earum optio soluta similique temporibus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptate, labore maiores, ullam accusantium facere aliquam neque ipsum sit impedit ratione officiis adipisci libero corporis earum optio soluta similique temporibus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptate, labore maiores, ullam accusantium facere aliquam neque ipsum sit impedit ratione officiis adipisci libero corporis earum optio soluta similique temporibus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptate, labore maiores, ullam accusantium facere aliquam neque ipsum sit impedit ratione officiis adipisci libero corporis earum optio soluta similique temporibus!", createdAt: new Date('June 13, 2025 03:24:00')}]
    dayjs.extend(relativeTime)


    return (
        <Card className="w-full">
            <CardHeader className="bg-muted/50">
                <CardTitle className="flex gap-2"><MessageSquare></MessageSquare> Comments</CardTitle>
            </CardHeader>
            <Separator></Separator>
            <CardContent className="flex flex-col">
                {story.comments.map(c => (
                    <div className="flex gap-2 items-start justify-start">
                        <Avatar className="mt-3">
                            <AvatarImage src={c.author.image} />
                            <AvatarFallback>{c.author.username}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-1">
                                <Link href={`/user/${c.author.id}`} className={cn(buttonVariants({variant: "link"}), "p-0")}>{c.author.username}</Link>
                                <span>·</span>
                                <span className="text-primary text-sm">{dayjs(c.createdAt).fromNow()}</span>
                            </div>
                            <p className="rounded-tr-xl rounded-br-xl rounded-bl-2xl py-2 px-4 bg-accent w-fit">{c.content}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
            <Separator></Separator>
            {/* TODO: wrap in session check */}
            <CardFooter className="flex justify-center items-center pt-6">
                <div className="flex items-center gap-2 w-full justify-between">
                    <Button variant="outline" size="icon">
                        <Smile />
                    </Button>
                    <Input className="grow w-full" type="text" placeholder="let us know your thoughts..." />
                    <Button variant="outline" size="icon"> 
                        <Send />    
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}