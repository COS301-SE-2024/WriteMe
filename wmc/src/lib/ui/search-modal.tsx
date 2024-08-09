'use client';
import { Button } from "@writeme/wmc/lib/ui/button"
import { Input } from "@writeme/wmc/lib/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "./dialog";


export function SearchModal() {
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleKeyDown = (event: { target: any; key: string; }) => {
    if (event.key === 'Enter') {
      console.log(inputVal);
      handleSearch();
    }
  };


  const handleSearch = async () => {

    if (inputVal.length > 2) {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${inputVal}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'icon'}><Search className="size-4"/></Button>
      </DialogTrigger>
      <DialogContent className="w-96 p-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search Books</h4>
            <p className="text-sm text-muted-foreground">
              Search for any published books and click Enter
            </p>
          </div>
          <div className="grid gap-2">
              <Input
                id="search"
                placeholder="Search..."
                className="col-span-2 h-10 text-lg"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
          </div>
          {loading && (
            <div role="status" className="flex justify-center items-center py-2">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
          )}
          {results.length > 0 && (
            <div className="search-results space-y-4">
              {results.map((result) => (
                <a key={result.id} href={`/stories/${result.id}`} className="search-result-item flex items-center space-x-4 p-2 rounded hover:bg-gray-100 transition duration-200">
                  {result.cover && (
                    <img src={result.cover} alt={result.title} className="w-16 h-20 rounded" />
                  )}
                  <span className="text-lg font-semibold">{result.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
