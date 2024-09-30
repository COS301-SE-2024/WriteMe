'use client';
import React, { useContext, useEffect, useState } from 'react';
import PromptPad from './prompt-pad';
import { CardStack } from '@writeme/wmc/lib/ui/card-stack';
import CopyButton from '@writeme/wmc/lib/ui/copy-button';
import { ParaphraseContext } from 'apps/writeme/components/editor-extensions/ParaphraseButton';
import { Skeleton } from '@writeme/wmc/lib/ui/skeleton';
import { SuggestionContext } from 'apps/writeme/components/editor-extensions/SuggestionButton';
import { EntityContext } from 'apps/writeme/components/editor-extensions/EntityButton';
import { GrammarContext } from 'apps/writeme/components/editor-extensions/GrammarButton';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@writeme/wmc/lib/ui/tooltip';
import { Card, CardContent, CardTitle } from '@writeme/wmc';
import { ScrollArea } from '@writeme/wmc/lib/ui/scroll-area';


function getFlairLabelMeaning(label: string) {
  // A dictionary mapping Flair's NER and POS labels to their English meanings
  const labelMeanings = {
    // NER labels
    PER: "Person's Name",
    ORG: 'Organization',
    LOC: 'Location',
    MISC: 'Miscellaneous Entity',

    // POS tags (Universal POS Tags as used in Flair)
    ADJ: 'Adjective',
    ADP: 'Adposition (Prepositions)',
    ADV: 'Adverb',
    AUX: 'Auxiliary Verb',
    CONJ: 'Conjunction',
    CCONJ: 'Coordinating Conjunction',
    DET: 'Determiner',
    INTJ: 'Interjection',
    NOUN: 'Noun',
    NUM: 'Numeral',
    PART: 'Particle',
    PRON: 'Pronoun',
    PROPN: 'Proper Noun',
    PUNCT: 'Punctuation',
    SCONJ: 'Subordinating Conjunction',
    SYM: 'Symbol',
    VERB: 'Verb',
    NN: 'Noun (Singular)',
    NNS: 'Noun (Plural)',
    NNP: 'Proper Noun (Singular)',
    NNPS: 'Proper Noun (Plural)',
    VB: 'Verb (Base Form)',
    VBD: 'Verb (Past Tense)',
    VBG: 'Verb (Gerund/Present Participle)',
    VBN: 'Verb (Past Participle)',
    VBP: 'Verb (Non-3rd Person Singular Present)',
    VBZ: 'Verb (3rd Person Singular Present)',
    JJ: 'Adjective',
    JJR: 'Adjective (Comparative)',
    JJS: 'Adjective (Superlative)',
    RB: 'Adverb',
    RBR: 'Adverb (Comparative)',
    RBS: 'Adverb (Superlative)',
    WRB: 'Wh-Adverb (e.g., how, where)',
    IN: 'Preposition or Subordinating Conjunction',
    DT: 'Determiner',
    PDT: 'Predeterminer',
    PRP: 'Personal Pronoun',
    PRP$: 'Possessive Pronoun',
    CC: 'Coordinating Conjunction',
    CD: 'Cardinal Number',
    EX: 'Existential There',
    FW: 'Foreign Word',
    LS: 'List Item Marker',
    MD: 'Modal',
    POS: 'Possessive Ending',
    RP: 'Particle',
    TO: 'To',
    UH: 'Interjection',
    WDT: 'Wh-Determiner',
    WP: 'Wh-Pronoun',
    WP$: 'Possessive Wh-Pronoun',

    X: 'Other (Foreign Words, Errors, etc.)',
  };

  // Return the English meaning if it exists, otherwise return the original label
  return labelMeanings[label] || label;
}


export const UtilContext = React.createContext({
  promptPadContent: '',
  setPromptPadContent: () => {},
  suggestionCards: [],
  setSuggestionCards: () => {},
});

export default function EditorUtils() {
  const [promptPadContent, setPromptPadContent] = useState('');
  const [suggestionCards, setSuggestionCards] = useState([]);

  const [currentCards, setCurrentCards] = useState([]);
  useEffect(() => {
    setCurrentCards(suggestionCards);
    // console.log(suggestionCards)
  }, [suggestionCards]);

  
  // paraphrasing
  const paraphrases = useContext(ParaphraseContext);

  const [currentParaphrases, setCurrentParaphrases] = useState([]);
  const [paraphraseLoading, setParaphraseLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(paraphrases.loading)
    setParaphraseLoading(paraphrases.loading);
  }, [paraphrases.loading]);

  useEffect(() => {
    setCurrentParaphrases(paraphrases.paraphrases);
  }, [paraphrases.paraphrases]);

  // suggestions

  const suggestions = useContext(SuggestionContext);

  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(paraphrases.loading)
    setSuggestionsLoading(suggestions.loading);
  }, [suggestions.loading]);

  useEffect(() => {
    // console.log(paraphrases.paraphrases)
    setCurrentSuggestions(suggestions.suggestions);
  }, [suggestions.suggestions]);


  // entities

  const entities = useContext(EntityContext);

  const [currentEntities, setCurrentEntities] = useState([]);
  const [entitiesLoading, setEntitiesLoading] = useState<boolean>(false);

  useEffect(() => {
    setEntitiesLoading(entities.loading);
  }, [entities.loading]);

  useEffect(() => {
    setCurrentEntities(entities.entities);
  }, [entities.entities]);



  // grammar

  const grammars = useContext(GrammarContext);

  const [currentCorrect, setCurrentCorrected] = useState("");
  const [currentGrammars, setCurrentGrammars] = useState([]);
  const [grammarsLoading, setGrammarsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(paraphrases.loading)
    setGrammarsLoading(grammars.loading);
  }, [grammars.loading]);

  useEffect(() => {
    // console.log(grammars.entities)
    setCurrentGrammars(grammars.entities);
  }, [grammars.entities]);

  useEffect(()=> {
    setCurrentCorrected(grammars.corrected);
  }, [grammars.corrected]);

  return (
    <UtilContext.Provider
      value={{
          promptPadContent,
          setPromptPadContent,
          suggestionCards,
          setSuggestionCards,
        }}
        >
      <>
        <PromptPad></PromptPad>
        {currentCards.length > 0 ? (
          <div className="flex-inline flex-col justify-center p-2">
            <h2 className="text-2xl font-bold mb-8">Your Prompt Answers</h2>
            {/* <Separator className='py-2'></Separator> */}
            <CardStack
              items={currentCards.map((c, idx) => ({
                id: idx,
                name: <ScrollArea className='h-40'>{c.a}</ScrollArea>,
                designation: '',
                content: (
                  <div className="flex items-start justify-between">
                    <p>{c.q}</p>
                    <CopyButton inputContent={c.a}></CopyButton>
                  </div>
                ),
              }))}
            ></CardStack>
            {/* <Separator className='py-2'></Separator> */}
          </div>
        ) : (
          <></>
        )}
        {/* PARAPHRASING */}
        {currentParaphrases.length > 0 && (
          <div className="flex flex-col justify-center p-2">
            <h2 className="text-2xl font-bold mb-8">
              Current Paraphrase Options:
            </h2>
            {currentParaphrases.map((p, idx1) => (p ?
              <CardStack
                key={idx1}
                items={p?.map((o, idx2) => ({
                  id: idx2,
                  name: `Sentence ${idx1 + 1}`,
                  designation: 'AI Paraphrase',
                  content: (
                    <div className="flex items-start justify-between">
                      <ScrollArea className='h-40'>
                      <p>{o[0]}</p>
                      </ScrollArea>
                      <CopyButton inputContent={o[0]}></CopyButton>
                    </div>
                  ),
                }))}
              ></CardStack> : <></>
            ))}
            
          </div>
        )}
        {paraphraseLoading && (
              <div className="flex flex-col justify-center p-2">
                <p>Loading...</p>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-60 w-60 md:h-60 md:w-96 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}
            {/* SUGGESTIONS */}
            {currentSuggestions.length > 0 && (
          <div className="flex flex-col justify-center p-2">
            <h2 className="text-2xl font-bold mb-8">
              Current Suggestion Options:
            </h2>
            {
              <CardStack
                items={currentSuggestions.map((o, idx1) => ({
                  id: idx1,
                  name: `Sentence ${idx1 + 1}`,
                  designation: 'AI Suggestion',
                  content: (
                    <div className="flex items-start justify-between">
                      <ScrollArea className='h-40'>
                        <p>{o.generated_text}</p>
                      </ScrollArea>
                      <CopyButton inputContent={o.generated_text}></CopyButton>
                    </div>
                  ),
                }))}
              ></CardStack>
            }
            
          </div>
        )}
        {suggestionsLoading && (
              <div className="flex flex-col justify-center p-2">
                <p>Loading...</p>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-60 w-60 md:h-60 md:w-96 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}
        
        {currentEntities.length > 0 && (
          <div className="flex flex-col justify-center p-2">
            <h2 className="text-2xl font-bold mb-8">
              Sentence Analysis:
            </h2>
            {currentEntities.map((e, idx1) => (
              <div className='flex flex-col gap-4'>
                {e.entities.length > 0 && (
                  <>
                  <h3>Tone: {e.labels[0].value}</h3>
                <h3>Detected Entities:</h3>
                <CardStack
                items={e.entities.map((e2, idx1) => ({
                  id: idx1,
                  name: `Sentence ${idx1 + 1}: Entity Detection`,
                  designation: `Type: ${getFlairLabelMeaning(e2.labels[0].value) || ""}`,
                  content: (
                    <div className="flex items-center justify-center">
                      <span className='text-3xl'>{e2.text}</span>
                    </div>
                  ),
                }))}
                ></CardStack>
                </>
                )}
                {e.tokens.length > 0 && (
                  <Card className='p-2'>
                  <CardTitle>
                    <h3>Parts of Speech:</h3>

                  </CardTitle>
                    <CardContent>

                <TooltipProvider>
                  <div className='flex flex-wrap gap-1'>

                {e.tokens.map((t) => (
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <span className='inline'>{t.text}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getFlairLabelMeaning(t.labels[0].value)}</p>
                  </TooltipContent>
                    </Tooltip>
                ))}
                </div>
                </TooltipProvider>

                </CardContent>
                </Card>
                )}
              </div>
              
            ))
              
            }
            
          </div>
        )}
        {entitiesLoading && (
              <div className="flex flex-col justify-center p-2">
                <p>Loading...</p>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-60 w-60 md:h-60 md:w-96 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}
        
        {currentGrammars.length > 0 && (
          <div className="flex flex-col justify-center p-2">
            <h2 className="text-2xl font-bold mb-8">
              Grammar Checker Results:
            </h2>
            <div>
              <h3>Correct version:</h3>
              <div className='flex justify-between'>
                <p>{currentCorrect}</p>
                <CopyButton inputContent={currentCorrect}></CopyButton>
              </div>
            </div>
            <CardStack
              key={'grammar-stack'}
              items={currentGrammars.map((g, idx) => ({
                id: idx,
                content: <>
                {g.replacements.length > 0 && (
                  <div className='flex flex-col'>
                    <p>Possible Replacements: </p>
                    {g.replacements.map((r) => (<span className='block'>{r}</span>))}
                  </div>
                )}
              </>,
                designation: <p>{g.context.substring(0, g.offset)}<em className='font-bold text-red-400'>{g.context.substring(g.offset, g.offset + g.errorLength)}</em> {g.context.substring(g.offset + g.errorLength)}</p>,
                name: g.rule
              }))}
            >

            </CardStack>
            
              {/* <CardStack
                items={currentGrammars.map((o, idx1) => ({
                  id: idx1,
                  name: {o.rule},
                  designation: (
                    // <></>
                    <p>{o.context.substring(0, o.offset)}<em>{o.context.substring(o.offset, o.offset + o.errorLength)}</em> {o.context.substring(o.offset + o.errorLength)}</p>
                  ),
                  content: (
                    <div className="flex items-start justify-between">
                      {o.replacements.length > 0 && (
                        <div>
                          <p>Possible Replacements: </p>
                          {o.replacements.map((r) => (<span>{r}</span>))}
                        </div>
                      )}
                    </div>
                  )
                }))}
              ></CardStack> */}
            
            
          </div>
        )}
        {grammarsLoading && (
              <div className="flex flex-col justify-center p-2">
                <p>Loading...</p>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-60 w-60 md:h-60 md:w-96 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            )}

      </>
    </UtilContext.Provider>
  );
}
