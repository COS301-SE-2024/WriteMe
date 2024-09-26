import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@writeme/wmc';
import WriteathonImageUpload from './image-upload';

export interface EditWriteathonProps {
  params: { story: string };
}

export default async function NewStory(props: EditWriteathonProps) {
  //let story = await getStoryInfo(props.params.story);

  return (
    <div className="">
      <LocalNavbar />

      <div className="flex items-center justify-center mt-4">
        <Card className="w-[70ch]">
          <CardHeader className="bg-muted/50">
            <CardTitle className="font-bold text-2xl text-center">
              Edit Your Story
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <WriteathonImageUpload story={story}></WriteathonImageUpload>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
