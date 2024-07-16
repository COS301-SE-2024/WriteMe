'use client';
import { Button } from "@writeme/wmc/lib/ui/button"
import { Input } from "@writeme/wmc/lib/ui/input"
import { Label } from "@writeme/wmc/lib/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@writeme/wmc/lib/ui/popover"
import { Search } from "lucide-react"
import { SetStateAction, useState } from 'react'

export function SearchModal() {
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (event: { target: any; key: string; }) => {
    if (event.key === 'Enter') {
      setInputVal(event.target.value);
      console.log(inputVal);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button><Search /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search Books</h4>
            <p className="text-sm text-muted-foreground">
              Search for any published books
            </p>
          </div>
          <div className="grid gap-2">
              <Input
                id="search"
                placeholder="Search..."
                className="col-span-2 h-8"
                onKeyDown={handleKeyDown}
              />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}