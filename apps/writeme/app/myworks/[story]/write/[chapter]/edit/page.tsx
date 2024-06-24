import { getAllTags } from 'apps/writeme/services/tags';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getStoryInfo } from 'apps/writeme/services/stories';
import { getAllGenres } from 'apps/writeme/services/genres';
import { Card, CardContent, CardHeader, CardTitle } from '@writeme/wmc';
import { getChapterInfo } from '../../../../../../services/chapters';
import EditChapterForm from './edit-chapter-form';


export interface EditChapterProps {
  params: {
    story: string;
    chapter: string;
  }
}

export default async function EditChapter(props: EditChapterProps) {

  let chapter = await getChapterInfo(props.params.chapter)
  return (
    <div className="">
      <LocalNavbar />

      <div className="flex items-center justify-center mt-4">
        <Card className="w-[70ch]">
          <CardHeader className="bg-muted/50">
            <CardTitle className="font-bold text-2xl text-center">Edit {chapter.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <EditChapterForm chapter={chapter}></EditChapterForm>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

