import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import NewChapterFrom from './new-chapter-from';

export interface NewChapterProps {
  params: {
    story: string;
  };
}

export default function Page(props: NewChapterProps) {
  return (
    <div className="flex flex-col ">
      <LocalNavbar />
      <div className="grow min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <NewChapterFrom story={props.params.story} />
        </div>
      </div>
    </div>
  );
}
