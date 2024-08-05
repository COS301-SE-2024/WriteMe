'use client';
import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose
} from '@writeme/wmc/lib/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@writeme/wmc/lib/ui/carousel';
import { Textarea } from '@writeme/wmc/lib/ui/textarea';
import { Button , buttonVariants} from '@writeme/wmc';
import {UtilContext} from "./editor-utilities";
import { useToast } from '@writeme/wmc/lib/ui/use-toast';

const QUESTIONS = [
"What is a challenge your character faces, and how do they overcome it?",
"Your character is given a choice between two equally difficult paths. Which do they choose, and why?",
"What is a lesson your character has learned from the past?",
"What motivates your character to keep going?",
"Describe a setting that describes all five senses.",
"Your character is caught in a moral dilemma. What do they do?",
"How does your character express love or affection?",
"What is something your character regrets, and how do they deal with it?",
"How does your character handle a betrayal by someone they trust",
"Describe the dynamic between your character and someone they are really close with."
]

interface ImprovAnswerFieldProps {
  q: string
  setSuggestionCards: any,
  suggestionCards: any[],
  api: any
}

const ImprovAnswerField = ({q, api}: ImprovAnswerFieldProps) => {
  const [canScroll, setCanScroll] = React.useState<boolean>(true);
  const [input, setInput] = useState("");
  const {promptPadContent,setPromptPadContent, suggestionCards, setSuggestionCards} = useContext(UtilContext)

  const {toast} = useToast();

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCanScroll(api.canScrollNext())
 
    api.on("select", () => {
      setCanScroll(api.canScrollNext())
    })
  }, [api])

  return (
    <div className={"flex flex-col justify-between"}>
    <p>{q}</p>
    <Textarea onChange={(v) => setInput(v.target.value)} value={input}></Textarea>
    <div className='flex justify-between gap-2 max-w-full'>
        {canScroll ? <Button onClick={() => {
          api.scrollNext()
        }}>Skip</Button> : <DialogClose >End Improv</DialogClose>}
        
        <Button onClick={() => {
          console.log(suggestionCards)
          toast({
            title: "Answer Saved"
          })
          setSuggestionCards([...suggestionCards, {q: q, a: input}])
          api.scrollNext();
        }}>Save</Button>
        </div>
      </div>
  )
}


export const ImprovGameDialog = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0)
    const [chosenQuestions, setChosenQuestions] =  useState<string[]>([]);
    const {suggestionCards, setSuggestionCards} = useContext(UtilContext)


    function choose() {
      var index = Math.floor(Math.random() * QUESTIONS.length);
      return QUESTIONS[index];
    }

    const chooseQuestions = () =>{
      let choices: string[] = [];
      for (let i = 0; i < 3; i++){
        let c = choose()
        while (choices.includes(c)){
          c = choose()
        }
        choices.push(c)
      }
      setChosenQuestions(choices);
    }

    React.useEffect(() => {
      if (!api) {
        return
      }
   
      setCurrent(api.selectedScrollSnap() + 1)
   
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])


  return (
    <Dialog>
        <Button asChild>
            <DialogTrigger onClick={chooseQuestions}>Start Improv</DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Improv Game</DialogTitle>
          <Carousel className="p-4" setApi={setApi}>
            <CarouselContent>
              {chosenQuestions.map(q=>

              <CarouselItem className='flex flex-col gap-4'>
                <ImprovAnswerField q={q} setSuggestionCards={setSuggestionCards} suggestionCards={suggestionCards} api={api}  ></ImprovAnswerField>
              </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
