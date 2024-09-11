import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import NewChapterFrom from './new-chapter-from';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@writeme/wmc/lib/ui/breadcrumb';
import { chapters } from 'apps/writeme/db/schema';

export interface NewChapterProps {
  params: {
    story: string;
  };
}

export default function Page(props: NewChapterProps) {
  return (
    <div className="flex flex-col ">
      <LocalNavbar />

      <Breadcrumb className='px-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/myworks">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/myworks/${props.params.story}`}>Current Story</BreadcrumbLink>
          </BreadcrumbItem>
        <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>New Chapter</BreadcrumbLink>
          </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>


      <div className="grow min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <NewChapterFrom story={props.params.story} />
        </div>
      </div>
    </div>
  );
}
