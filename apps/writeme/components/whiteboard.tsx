"use client";

import { Tldraw } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'
import { useContext } from 'react';
import { LiveSessionContext } from './live-session-context';
import { useSession } from 'next-auth/react';
import 'tldraw/tldraw.css'
import { Button } from '@writeme/wmc';
import { Shrink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@writeme/wmc/lib/ui/tooltip';

// import { randomUUID } from 'crypto';


export default function WhiteBoard() {
    const {session, whiteboard, whiteboardFullScreen} = useContext(LiveSessionContext);

    const {data} = useSession()

    const userInfo = {
        name : data?.user?.name || "Guest User",
        id : data?.user?.id || self.crypto.randomUUID()
    }

    const store = useSyncDemo({ roomId: `writeme-${session}-whiteboard`, userInfo })

    if (!whiteboard){
        return <></>
    }

	return (
		<div className='tldraw__editor grow' style={{position: whiteboardFullScreen ? "fixed" : "initial", inset: 0}} >
			<Tldraw store={store} />
		</div>
	)
}

export function ExitWhiteBoardFullscreenButton(){
    const {setWhiteBoardFullScreen, whiteboardFullScreen} = useContext(LiveSessionContext);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className={whiteboardFullScreen? 'flex' : 'hidden'} onClick={() => setWhiteBoardFullScreen(false)}><Shrink/></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Exit Whiteboard Fullscreen</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}