"use client"
import { useToast } from "./use-toast";
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
import { IconBrandMessenger } from "@tabler/icons-react";
import { IconLink } from "@tabler/icons-react";
import { IconBrandX } from "@tabler/icons-react";

export interface ShareProps{
  link:string,
  message?:string
}

const handleMessengerShare = ({ link, message }: ShareProps) => {
  const facebookDialogUrl = `https://www.facebook.com/dialog/send?app_id=274266067164&link=${encodeURIComponent(link)}&redirect_uri=${encodeURIComponent(link)}&display=popup&quote=${encodeURIComponent(message)}&description=Check%20this%20out`;
  window.open(facebookDialogUrl, '_blank');
};

export function ShareStory({link, message}: ShareProps) {
  const {toast} = useToast()
  const handleCopyLink = async({link}: ShareProps) => {
    await navigator.clipboard.writeText(link)
    toast({
      title: "Copied Successfully"
    })
  
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share className="h-4 w-4"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent">
        <div className="flex flex-col gap-4">
          <div className="">
            <h4 className="font-medium leading-none text-center">Share</h4>
            <p className="text-sm text-muted-foreground text-center">
              Share the link 
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Link target="_blank" href={`https://wa.me/send?text=${message}...${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandWhatsapp className="h-8 w-8"></IconBrandWhatsapp>
            </Link>
            {/* need to take look at this again */}
            <Link target="_blank" href={`https://pinterest.com/pin/create/button/?url=${link}&description=${message}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandPinterest className="h-8 w-8"></IconBrandPinterest>
            </Link>
            <Link target="_blank" href={`https://www.reddit.com/submit?url=${link}&title=${message}&type=LINK`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandReddit className="h-8 w-8"></IconBrandReddit>
            </Link>
            <Link target="_blank" href={`https://x.com/intent/post?url=${link}&text=${message}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconBrandX className="h-8 w-8"></IconBrandX>
            </Link>
            <Link target="_blank" href={`mailto:?subject=${message}&body=${link}`} className={buttonVariants({variant:"ghost", size:"icon"})}>
              <IconMail className="h-8 w-8"></IconMail>
            </Link>
            <button className={buttonVariants({ variant: "ghost", size: "icon" })} onClick={() => handleMessengerShare({ link, message })}>
              <IconBrandMessenger className="h-8 w-8" />
            </button>
            <Button variant="ghost" size="icon">
              <IconLink className="h-8 w-8" onClick={() => handleCopyLink({link})} />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
