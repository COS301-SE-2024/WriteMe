import NewStoryForm from './new-story-form';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Card, CardContent, CardHeader } from '@writeme/wmc';
import { Separator } from '@writeme/wmc/lib/ui/separator';

export interface NewStoryProps {}

export default function NewStory(props: NewStoryProps) {
  return (
    <div className="flex flex-col">
      <LocalNavbar />
      <div className="flex-grow flex items-center justify-center mt-4 px-4">
        <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <CardHeader className="bg-muted/50 rounded-lg">
            <h1 className="font-bold text-2xl text-center">Create a new story</h1>
          </CardHeader>
          <Separator />
          <CardContent>
            <NewStoryForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
