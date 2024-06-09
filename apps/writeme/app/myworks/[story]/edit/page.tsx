import { getAllTags } from 'apps/writeme/services/tags';
import EditStoryForm from './edit-story-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';


export interface NewStoryProps {}

export default async function NewStory(props: NewStoryProps) {
  let tags = await getAllTags();
  return (
    <div className="">
      <LocalNavbar />
      <h1 className="font-bold text-6xl text-center">Edit Your Story</h1>
      <EditStoryForm tagItems={tags} genreItems={[]}/>
    </div>
  );
}
