'use client';

import { useState, useEffect } from 'react';
import { BentoGrid } from '@writeme/wmc/lib/ui/bento-grid';
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@writeme/wmc';
import { cn } from '@writeme/wmc/utils';
import Image from 'next/image';
import { BookOpenText, Heart, MessageCircle, MoveUp, MoveDown, Search } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';
import { ToggleGroup, ToggleGroupItem } from '@writeme/wmc/lib/ui/toggle-group';
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger} from '@writeme/wmc/lib/ui/multi-select';

dayjs.extend(relativeTime);
interface Genre {id: string, genre: string}
interface BentoGridProps {
    stories: any[]
    genres: Genre[]
}


const  BentoGridComponent = ({ stories, genres }: BentoGridProps) => { 
  const [storiesState, setStoriesState] = useState(stories);
  const [filter, setFilter] = useState("all");
  const [orderBy, setOrderBy] = useState("asc");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);



  const getFilteredStories = async () => {
    try {
      const res = await fetch("/api/story/filter", {
          method: 'post',
          body: JSON.stringify({
              orderby: orderBy,
              filterby: filter,
              genres: selectedGenres
          }),
          headers: {
            'Content-Type': 'application/json',
          },
      })

      stories =await res.json();
      setStoriesState(stories.stories)

  }catch(e:any){

  }
  }

  const handleFilterChange = async (p0:string) => {
    await getFilteredStories()
  }

  const handleOrderByChange = async (p0: string) => {
    await getFilteredStories()
  }

  const handleGenreChange =  async (p0: string[]) => {
    setSelectedGenres(p0);
  }

  useEffect(() => {
    getFilteredStories()
  }, [selectedGenres])



  useEffect(() => {
      setStoriesState(stories);
  }, [stories]);
    return (
      <div className="flex flex-col items-center">
        <div className="flex ">
          <ToggleGroup type="single" defaultValue='all' onValueChange={handleFilterChange}>
            <ToggleGroupItem value="all" aria-label="All" onClick={() => setFilter('all')}>
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="date_created" aria-label="first created" onClick={() => setFilter('date_created')}>
              Created
            </ToggleGroupItem>
            <ToggleGroupItem value="date_updated" aria-label="Recent Updates" onClick={() => setFilter('date_updated')}>
              Recent Updates
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" defaultValue='asc' onValueChange={handleFilterChange}>
            <ToggleGroupItem value="liked" aria-label="Liked" onClick={() => setOrderBy('asc')}>
              <MoveUp className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="asc" aria-label="All" onClick={() => setOrderBy('desc')}>
              <MoveDown className="h-4 w-4"/>
            </ToggleGroupItem>
          </ToggleGroup>
          <MultiSelector onValuesChange={handleGenreChange} values={selectedGenres}>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select Genres" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {genres.map(g => (
                    <MultiSelectorItem value={g.id}>{g.genre}</MultiSelectorItem>
                  ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
               </MultiSelector>
            <Button onClick={async () => {
              await getFilteredStories();
            }}><Search/></Button>
        </div>

        <BentoGrid className="max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[20rem] gap-4">
          {storiesState.map((story, i) => (
            <Card
              className={cn(
                'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4',
                i === 3 || i === 6 ? 'md:col-span-2' : ''
              )}
              key={story.id}
            >
              <CardHeader>
                <div className="flex gap-2 justify-evenly">
                  <div className="relative aspect-[3/4] h-40">
                    <img alt="Book Cover" src={story.cover} />
                  </div>
                  <div className="pl-3 flex flex-col gap-2 justify-between">
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>{dayjs(story.createdAt).fromNow()}</CardDescription>
                    <div className="flex pt-5 items-center">
                      <CardDescription>
                        <Heart />
                      </CardDescription>
                      <p className="text-[15px] pr-2">{story.likes.length}</p>
                      <CardDescription>
                        <MessageCircle />
                      </CardDescription>
                      <p className="text-[15px] pr-2">{story.comments.length}</p>
                      <CardDescription>
                        <ShareStory link={`https://writeme.co.za/stories/${story.id}`} message={`Check out ${story.title}`} />
                      </CardDescription>
                    </div>
                    <Button asChild variant="default">
                      <Link href={`/stories/${story.id}`}>
                        <div className="flex gap-1 items-center">
                          <BookOpenText size="1rem" /> Read
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardFooter>
                <CardDescription>
                  <Link href={`/user/${story.userId}`}>Author: {story.author.name}</Link>
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
    
          {storiesState.length === 0 && <span className="text-center grow">There are currently no published stories that match your filtered options.</span>}
        </BentoGrid>
      </div>
    );
  }

  export default BentoGridComponent