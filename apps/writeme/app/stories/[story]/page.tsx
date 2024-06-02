import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import React from 'react';
import { getStory } from '../../../services/stories';

/* eslint-disable-next-line */
export interface StoryProps {
  params: {
    story: string
  }
}




export default async function Story(props: StoryProps) {

  const story = await getStory(props.params.story);


  return (
    <div>
      <LocalNavbar></LocalNavbar>
      <div className="flex justify-center py-4  flex-col items-center">
        <div className="flex flex-col items-center max-w-[70ch]">

        <h1 className="text-4xl">{story.title}</h1>

        <div className="flex flex-col gap-1 text-lg" dangerouslySetInnerHTML={{__html: story.content}}>

        </div>
        </div>

      </div>
    </div>
  );
}
