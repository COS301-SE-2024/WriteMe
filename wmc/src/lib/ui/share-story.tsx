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
import { IconBrandPinterest } from "@tabler/icons-react";
import { IconBrandReddit } from "@tabler/icons-react";
// import { IconBrandInstagram } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
//copy to clipboard, facebook messenger(clicktochat)

export interface ShareProps{
  link:string,
  message?:string
  // 
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
          <div className="space-x-2">
            <Link target="_blank" href={`https://wa.me/send?text=${message}...${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandWhatsapp className="h-10 w-10"></IconBrandWhatsapp>
            </Link>
            {/* need to take look at this again */}
            <Link target="_blank" href={`https://pinterest.com/pin/create/button/?url=${link}&description=${message}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandPinterest className="h-10 w-10"></IconBrandPinterest>
            </Link>
            <Link target="_blank" href={`https://www.reddit.com/submit?title=${message}&text=${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandReddit className="h-10 w-10"></IconBrandReddit>
            </Link>
            {/* <Link target="_blank" href={`https://www.instagram.com`} className={buttonVariants({ variant: "ghost", size: "icon" })} onClick={() => { navigator.clipboard.writeText(`message`); alert('Copied to clipboard!'); }}>
              <IconBrandInstagram className="h-10 w-10"></IconBrandInstagram>
            </Link> */}
            <Link target="_blank" href={`mailto:?subject=${message}&body=${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconMail className="h-10 w-10"></IconMail>
            </Link>
            
          </div>
          
        </div>
      </PopoverContent>
    </Popover>
  )
}
