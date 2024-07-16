'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@writeme/wmc/lib/ui/dialog"
import { Button } from "react-day-picker";

const SearchModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>
            This is the description of your modal.
          </DialogDescription>
        </DialogHeader>
        {/* ... your modal content here ... */}
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
