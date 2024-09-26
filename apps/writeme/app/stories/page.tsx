import styles from './page.module.css';
import { db } from '../../db/db';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@writeme/wmc';
import { cn } from '@writeme/wmc/utils';
import BookCover from '../../assets/temp-cover2.jpg';
import * as dayjs from 'dayjs';
import { BookOpenText, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPublishedStories } from '../../services/stories';
export const dynamic = 'force-dynamic';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { ShareStory } from '@writeme/wmc/lib/ui/share-story';
import BookmarkButton from 'apps/writeme/components/bookmark-button';
import { isBookmarked } from 'apps/writeme/services/users';
import { auth } from 'apps/writeme/auth';
import BentoGridComponent from './bentogrid';

/* eslint-disable-next-line */
export interface StoriesProps {}

export default async function Stories(props: StoriesProps) {
  const stories = await getPublishedStories();
  dayjs.extend(relativeTime)
;
  return (
    <div>
      <LocalNavbar />
      <BentoGridComponent stories={stories} />
    </div>
  );
}
