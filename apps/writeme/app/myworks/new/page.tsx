import LocalNavbar from './local-navbar';
import NewStoryForm from './new-story-form';


export interface NewStoryProps {}

export default function NewStory(props: NewStoryProps) {
  return (
    <div className="">
      <LocalNavbar />
      <h1 className="font-bold text-6xl text-center">Create a new story</h1>
      <NewStoryForm />
    </div>
  );
}
