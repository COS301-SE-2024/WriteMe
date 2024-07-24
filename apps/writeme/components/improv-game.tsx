'use client';
import React from 'react';
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

export const ImprovGameDialog = () => {
    const [api, setApi] = React.useState<CarouselApi>()

    const skipQuestion = () => {

    }

  return (
    <Dialog>
        <Button asChild>
            <DialogTrigger>Start Improv</DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Improv Game</DialogTitle>
          <Carousel className="p-4">
            <CarouselContent>
              <CarouselItem>
                <p>Question 1</p>
                <Textarea >
                </Textarea>
                <div className='flex justify-between gap-2'>
                    <Button>Skip</Button>
                    <Button>Save</Button>
                </div>
              </CarouselItem>
              <CarouselItem>...</CarouselItem>
              <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
