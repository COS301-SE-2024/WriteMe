'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
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
import { Button} from '@writeme/wmc';

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



export const ImprovGameDialog = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [chosenQuestions, setChosenQuestions] =  useState<string[]>([]);

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

    const skipQuestion = () => {

    }

  return (
    <Dialog>
        <Button asChild>
            <DialogTrigger onClick={chooseQuestions}>Start Improv</DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Improv Game</DialogTitle>
          <Carousel className="p-4">
            <CarouselContent>
              {chosenQuestions.map(q=> 

              <CarouselItem className='flex flex-col gap-4'>
                <p>{q}</p>
                <Textarea>
                </Textarea>
                <div className='flex justify-between gap-2'>
                    <Button>Skip</Button>
                    <Button>Save</Button>
                </div>
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
