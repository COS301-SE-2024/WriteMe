import { getAllTags } from 'apps/writeme/services/tags';
import EditStoryForm from './edit-story-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getStoryInfo } from 'apps/writeme/services/stories';
import { getAllGenres } from 'apps/writeme/services/genres';


export interface NewStoryProps {
  params: {story: string}
}

export default async function NewStory(props: NewStoryProps) {
  let tags = await getAllTags();
  let genres = await getAllGenres();
  let story = await getStoryInfo(props.params.story);
  return (
    <div className="">
      <LocalNavbar />
      <h1 className="font-bold text-6xl text-center">Edit Your Story</h1>
      <EditStoryForm title={story?.title || ""} brief={story?.brief || ""} description={story?.description || ""} tagItems={tags} genreItems={genres}/>
    </div>
  );
}
