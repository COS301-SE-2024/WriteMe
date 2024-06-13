import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import NewChapterFrom from './new-chapter-from';

export interface NewChapterProps {
  params: {
    story: string
  }
}
export default async function Page(props: NewChapterProps) {
  return (
    <div className="">
      <LocalNavbar></LocalNavbar>
      <div className="flex flex-col items-center justify-center gap-4 pt-4">
        <NewChapterFrom story={props.params.story}></NewChapterFrom>
      </div>
    </div>
  );
}
