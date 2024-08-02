"use client"
import React, {useState} from 'react';
import PromptPad from './prompt-pad';
import { CardStack } from '@writeme/wmc/lib/ui/card-stack';

export const UtilContext = React.createContext({
    promptPadContent: "",
    setPromptPadContent: () => {},
    suggestionCards: [],
    setSuggestionCards: () => {},
});


export default  function EditorUtils() {
    const [promptPadContent, setPromptPadContent] = useState("");
    const [suggestionCards, setSuggestionCards] = useState([]);
    return (

        // @ts-ignore
        <UtilContext.Provider value={{promptPadContent, setPromptPadContent, suggestionCards, setSuggestionCards}}>
            <>
            {suggestionCards.length > 0 ? <CardStack items={suggestionCards.map((c, idx) => ({
                id: idx,
                name: c.q,
                designation: c.a,
                content: "",
            }))} ></CardStack> : <></>}
            
            <PromptPad></PromptPad>
            </>
        </UtilContext.Provider>
    )
}