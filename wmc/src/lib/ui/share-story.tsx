import React from "react"
import { Button, buttonVariants } from '@writeme/wmc';
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { Share } from 'lucide-react';
import { IconBrandWhatsapp } from "@tabler/icons-react";
//pinterest, reddit, copy to clipboard, email (mailto:), facebook messenger(clicktochat), instagram?

export interface ShareProps{
  link:string,
  message?:string
}

export function ShareStory({link, message}: ShareProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share className="h-4 w-4"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-center">Share</h4>
            <p className="text-sm text-muted-foreground text-center">
              Share the link 
            </p>
          </div>
          <div>
            <Link target="_blank" href={`https://wa.me/send?text=${message}...${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandWhatsapp className="h-10 w-10"></IconBrandWhatsapp>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
