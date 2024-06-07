import EditStoryForm from './edit-story-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';


export interface NewStoryProps {}

export default function NewStory(props: NewStoryProps) {
  return (
    <div className="">
      <LocalNavbar />
      <h1 className="font-bold text-6xl text-center">Edit Your Story</h1>
      <EditStoryForm />
    </div>
  );
}