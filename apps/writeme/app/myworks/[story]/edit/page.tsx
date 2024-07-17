import EditStoryForm from './edit-story-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getStoryInfo } from 'apps/writeme/services/stories';
import { getAllGenres } from 'apps/writeme/services/genres';
import { Card, CardContent, CardHeader, CardTitle } from '@writeme/wmc';


export interface NewStoryProps {
  params: {story: string}
}

export default async function NewStory(props: NewStoryProps) {
  // let tags = await getAllTags();
  let genres = await getAllGenres();

  let story = await getStoryInfo(props.params.story);
  return (
    <div className="">
      <LocalNavbar />

      <div className="flex items-center justify-center mt-4">
      <Card className="w-[70ch]">
        <CardHeader className="bg-muted/50">
          <CardTitle className="font-bold text-2xl text-center">Edit Your Story</CardTitle>
        </CardHeader>
        <CardContent>
           <EditStoryForm id={story?.id || ""} title={story?.title || ""} brief={story?.brief || ""} description={story?.description || ""} genreItems={genres} selectedGenres={story?.genres} published={story?.published || false} />

        </CardContent>
      </Card>
      </div>

    </div>
  );
}

