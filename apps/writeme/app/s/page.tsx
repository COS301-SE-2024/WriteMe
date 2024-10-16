import { auth } from '../../auth';
import { redirect, RedirectType } from 'next/navigation';
import { getMySharedEditableSessions, getMySharedViewableSessions } from '../../services/sessions';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@writeme/wmc';
import { deleteViewableSession, deleteSession } from '../../services/client-services';
import DeleteSessionButton from './DeleteSessionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';


const Page = async () => {
  const session = await auth();

  if (!session.user) {
    redirect('/auth/login', RedirectType.push);
    return null;
  }

  const viewableSessions = await getMySharedViewableSessions();
  const editableSessions = await getMySharedEditableSessions();

  return (
    <div>
      <LocalNavbar />
      <div className="flex flex-col items-center lg:items-start justify-center lg:flex-row">
        <Card key="viewable-sessions" className="w-80">
          <CardHeader>
            <CardTitle>Viewable Sessions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8" key="viewable-sessions-content">

            {viewableSessions.map(vs =>
            <div className="flex items-center justify-between gap-4 w-full" id={vs.id}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={vs.chapter.cover} alt="Cover" />
                <AvatarFallback>{vs.chapter.title.at(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <Link href={`/s/v/${vs.id}`}>
                  <p className="text-sm font-medium leading-none">{vs.chapter.title}</p>
                </Link>
              </div>
              <DeleteSessionButton sessionType={'viewable'} id={vs.id} />
            </div>
            )}

          </CardContent>
        </Card>


        <Card id="editable-sessions" className="w-80">
          <CardHeader>
            <CardTitle>Editable Sessions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8" id="editable-sessions-content">

            {editableSessions.map(vs =>
              <div id={vs.id} className="flex items-center justify-between gap-4 w-full">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={vs.chapter.cover} alt="Cover" />
                  <AvatarFallback>{vs.chapter.title.at(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <Link href={`/s/e/${vs.id}`}>
                    <p className="text-sm font-medium leading-none">{vs.chapter.title}</p>
                  </Link>
                </div>
                <DeleteSessionButton sessionType={'editable'} id={vs.id} />
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
