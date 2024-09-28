"use client";

import PaceAward from "../assets/Pacing_Pro.svg"
import EmotionAward from "../assets/Emotion_Evoker.svg"
import CreativeAward from "../assets/Creative_Spark.svg"
import SciFiAward from "../assets/Sci-Fi_Specialist.svg"
import ImageryAward from "../assets/Imagery_Expert.svg"
import {Dialog , DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle} from "@writeme/wmc/lib/ui/dialog"
import Image from "next/image"
import React from 'react';
import Link from "next/link"
import { Avatar, AvatarImage } from '@writeme/wmc/lib/ui/avatar';
import { Badge } from '@writeme/wmc/lib/ui/badge';
import dayjs from "dayjs";
export interface AwardsDisplayProps{
  awards : {
    story : {
      id: string,
      title: string
    },
    writeathon: {
      id: string,
      title: string
    },
    award: string,
    createdAt: Date
  }[]
}

const AwardsDisplay = ({awards }: AwardsDisplayProps) => {
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const grouped  = groupBy(awards, 'award');



  return (
    <div>
      {Object.entries(grouped).map((value) => {
        return <AwardElement awards={value[1]}/>
      })}
    </div>
  );
};

const AwardElement = ({awards} : AwardsDisplayProps) => {
  const getImage = (award: string) => {
    switch (award) {
      case "creative-spark":
        return CreativeAward
      case "emotion-evoker":
        return EmotionAward
      case "imagery-expert":
        return ImageryAward
      case "pacing-pro":
        return PaceAward
      case "sci-fi-specialist":
        return SciFiAward
    }
  }


  const descriptions = {
    "creative-spark": {
      "category": "Creative Spark",
      "description": "Community Award for stories show the most creativity"
    },
    "emotion-evoker": {
      "category": "Emotion Evoker",
      "description": "Community Award for stories that could make a grown man cry"
    },
    "imagery-expert": {
      "category": "Imagery Expert",
      "description": "Community Award for stories that speak to your third eye"
    },
    "pacing-pro": {
      "category": "Pacing Pro",
      "description": "Community Award for stories that have the best timing."
    },
    "sci-fi-specialist": {
      "category": "Sci-fi Specialist",
      "description": "Community Award for stories that scream Stars Wars and Dune"
    }
  }




  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Avatar className="w-32 h-32" >
            <AvatarImage src={getImage(awards[0].award).src}  />
          </Avatar>
          <Badge> {awards.length}</Badge>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{descriptions[awards[0].award].category}</DialogTitle>
          <DialogDescription>
            {descriptions[awards[0].award].description}
          </DialogDescription>
          <div className="flex justify-center items-center">
            <Image src={getImage(awards[0].award).src} alt={descriptions[awards[0].award].category} width={200} height={200} />
          </div>
          {awards.map(a => (
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                <Link className="text-black text-bold dark:text-white" href={`/stories/${a.story.id}`}>{a.story.title}</Link> won this award in <Link href={`/writeathons/${a.writeathon.id}`} className="text-black text-bold dark:text-white">{a.writeathon.title}</Link>
              </p>
              <div className="ml-auto font-medium">{dayjs(a.createdAt).format('MMM D, YYYY h:mm A')}</div>
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default AwardsDisplay;
