"use client"


import { Button } from '@writeme/wmc';
import { Expand, PencilRuler, Phone } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

export const LiveSessionContext = createContext({
    session: "",
    whiteboard: false,
    conference: false,
    setConference: (p0: boolean) => {},
    setWhiteBoard: (p0: boolean) => {},
    setSession: (p0: string) => {},
    whiteboardFullScreen: false,
    conferenceFullScreen: false,
    setWhiteBoardFullScreen: (p0: boolean) => {},
    setConferenceFullScreen: (p0: boolean) => {},

});


export interface LiveSessionWrapperProps {
    sessionId: string,
    children?: ReactNode
}


export const LiveSessionWrapper = ({children, sessionId} : LiveSessionWrapperProps) => {
    const [session, setSession] = useState(sessionId);
    const [whiteboard, setWhiteBoard] = useState(true);
    const [conference, setConference] = useState(true);
    const [whiteboardFullScreen, setWhiteBoardFullScreen] = useState(false);
    const [conferenceFullScreen, setConferenceFullScreen] = useState(false);

    return (
        <LiveSessionContext.Provider value={{session, whiteboard, conference, setConference, setSession, setWhiteBoard, setConferenceFullScreen, setWhiteBoardFullScreen, whiteboardFullScreen, conferenceFullScreen}}>
            {children}
        </LiveSessionContext.Provider>
    )
}

export const LiveSessionControls = () => {
    const {conference, whiteboard, setConference, setWhiteBoard, whiteboardFullScreen, setWhiteBoardFullScreen} = useContext(LiveSessionContext);

    return (
        <div className='flex flex-col gap-2 max-w-lg'>
            <Button className="flex gap-1" onClick={() => setConference(!conference)}><Phone/> {!conference ? "Join" : "End"} Live Discusson</Button>

            {/*<Button className="flex gap-1" onClick={() => setWhiteBoard(!whiteboard)}><PencilRuler />  {!whiteboard ? "Join" : "End"} WhiteBoard Session</Button>*/}
            {/*{whiteboard && (*/}
                <Button onClick={() => setWhiteBoardFullScreen(!whiteboardFullScreen)}><Expand/> Fullscreen WhiteBoard</Button>
            {/*)}*/}
        </div>
    )
}
