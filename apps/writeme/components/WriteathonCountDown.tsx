'use client';

import React from 'react';
import Countdown from 'react-countdown';
import { useRouter } from 'next/navigation';


export interface WriteathonCountDownProps {
  withRefresh: boolean,
  date: Date
}


const WriteathonCountDown = ({ date, withRefresh }: WriteathonCountDownProps) => {
  const router = useRouter();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      router.refresh();
      return <div className="flex items-baseline gap-1 text-4xl tabular-nums">It's Time!</div>;
    } else {
      // Render a countdown
      return <div className="flex items-baseline gap-1 text-4xl tabular-nums">
        {hours}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            hr
          </span>
        {minutes}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            min
          </span>
        {seconds}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            s
          </span>
      </div>;
    }
  };
  return (
    <Countdown
      date={date}
      renderer={renderer}
    ></Countdown>
  );
};

export default WriteathonCountDown;
