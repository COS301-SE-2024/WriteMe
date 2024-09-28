'use client';

import {
  Chat,
  ChatEntry,
  ControlBar,
  GridLayout,
  LayoutContextProvider,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { LiveSessionContext } from './live-session-context';
import { cn } from '@writeme/wmc/utils';
import { useTheme } from 'next-themes';

export interface LiveDiscussionProps {
  room: string;
  children?: ReactNode;
}

function LiveDiscussion({ room, children }: LiveDiscussionProps) {
  const [token, setToken] = useState('');
  const { conference } = useContext(LiveSessionContext);
  const name = 'test';

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!token) {
    return null;
  }

  const theme = useTheme();

  return (
    <LayoutContextProvider>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        connect={true}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className="rounded-md flex flex-col h-full"
        data-lk-theme={theme.theme == "dark" ? "default" : "light"}
      >
        {children}
      </LiveKitRoom>
    </LayoutContextProvider>
  );
}

export function VideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      className="rounded-md"
      style={{ height: 'calc(100% - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}

export function VideoConferenceWithControls() {
  const { conference } = useContext(LiveSessionContext);

  return (
    <div
      className="flex flex-col w-full h-full"
      data-lk-theme="default"
    >
      <div className="flex grow">
        <VideoConference />
        <RoomAudioRenderer />
        <Chat className="rounded-md" >
        </Chat>
      </div>



        <ControlBar
          controls={{
            camera: true,
            microphone: true
          }}
          variation="minimal"
        />


    </div>
  );
}

export default LiveDiscussion;
