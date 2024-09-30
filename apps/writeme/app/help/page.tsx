import { Button } from '@writeme/wmc';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@writeme/wmc/lib/ui/accordion';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import Link from 'next/link';
import Image from 'next/image';
import newStory1 from '../../../writeme-docs/docs/images/MyStoriesPage.png';
import EditStory from '../../../writeme-docs/docs/images/EditStory.png';
import ChapterView from '../../../writeme-docs/docs/images/ChapterView.png';
import CreateChapter from '../../../writeme-docs/docs/images/CreateChapter.png';
import CreateChapter2 from '../../../writeme-docs/docs/images/CreateChapter2.png';
import NewStory from '../../../writeme-docs/docs/images/NewStory.png';
import ProfilePage from '../../../writeme-docs/docs/images/ProfilePage.png';
import EditProfile from '../../../writeme-docs/docs/images/EditProfile.png';
import BackButton from 'apps/writeme/components/back-button';

export const metadata = {
  title: 'Help | WriteMe',
  description: '',
};

export default function Help() {
  return (
    <div className="relative">
      <LocalNavbar></LocalNavbar>
      <div className="sticky top-16">
        <BackButton></BackButton>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">FAQs</h1>

        <Accordion type="multiple" className="w-1/2">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              When I create a chapter can everyone see it?
            </AccordionTrigger>
            <AccordionContent>
              No, not until you have explicity published said chapter.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              When I create a story can everyone see it?
            </AccordionTrigger>
            <AccordionContent>
              No, it is only visible to you until published
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              When I create a story do I have to create a chapter?
            </AccordionTrigger>
            <AccordionContent>
              Yes, but you can have as many or as little chapters as you want
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How do I find other people's work?
            </AccordionTrigger>
            <AccordionContent>
              Click the 'Explore' tab at the top of the page and you will be
              able to see work published to the public by other authors
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I create a new story?</AccordionTrigger>
            <AccordionContent>
              Click the 'New Story' at the top of the page and you will be
              directed to a page where you can create a brand new story.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How do I publish a story?</AccordionTrigger>
            <AccordionContent>
              When you in the story editor, click the 'Publish' button in the
              top right of the screen
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              Can other people edit my stories?
            </AccordionTrigger>
            <AccordionContent>
              Other people can only edit your story if you are collaborating on
              a story with them.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>
              How do I comment on a specific chapter?
            </AccordionTrigger>
            <AccordionContent>
              While you are reading a certain chapter. You will be able to leave
              comments on that specific chapter on the right hand side of the
              screen.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <br></br>
        <br></br>
        <br></br>

        <h1 className="text-3xl font-bold">Guides</h1>

        <br></br>
        <div className="flex flex-col items-left pl-40 text-lg">
          <h2 className="test-2xl font-bold">Creating and Editing Stories</h2>
          <br></br>
          <p>
            Once you have been logged in, you will be taken to the 'My Stories'
            page. This page will display all the stories that you have saved and
            published.
          </p>
          <br></br>
          <Image
            alt="my_stories_page"
            src={newStory1}
            width={1000}
            height={500}
          ></Image>

          <p>
            1. Click on the 'View' button on a story you would like to view/edit
          </p>

          <br></br>

          <h2 className="test-2xl font-bold">Edit/View existing chapter</h2>
          <br></br>
          <Image
            alt="edit_story_page"
            src={EditStory}
            width={1000}
            height={500}
          ></Image>

          <p>
            1. Click on the three dots to select the 'Edit' option. You will
            then be taken to the editor.
          </p>

          <br></br>
          <Image
            alt="chapter_view"
            src={ChapterView}
            width={1000}
            height={500}
          ></Image>

          <p>
            1. This panel will show you a variety of ideas for various
            charactors and also suggestion to aid you when you are writing a
            story.
          </p>
          <p>
            2. You can click on the 'Save' button which will save your story and
            only you will be able to view it.
          </p>
          <p>
            3. Once you are confident, you can click on the 'Publish' button to
            publish your story for others to view.
          </p>
          <br></br>

          <h2 className="test-2xl font-bold">Creating a New Chapter</h2>

          <br></br>

          <Image
            alt="create_chapter"
            src={CreateChapter}
            width={1000}
            height={500}
          ></Image>
          <p>
            1. Click on the 'Create New Chapter' button. You will then be taken
            to a new page.
          </p>

          <br></br>

          <Image
            alt="create_chapter2"
            src={CreateChapter2}
            width={1000}
            height={500}
          ></Image>
          <p>
            1. Enter a compulsory 'Title' that fits the chapter you would like
            to write.
          </p>
          <p>2. Enter an optional 'Brief'.</p>
          <p>3. Enter an optional 'Description'.</p>
          <p>
            4. Once you are satisfied with everything, you can click on the
            'Submit' button.
          </p>

          <br></br>

          <h2 className="test-2xl font-bold">Creating a New Story</h2>

          <p>
            You can navigate to this page by clicking on the 'New Story' tab in
            the navigation bar on the top.
          </p>

          <br></br>
          <Image
            alt="new_story_page"
            src={NewStory}
            width={1000}
            height={500}
          ></Image>

          <p>
            1. Enter a compulsory 'Title' that fits the story you would like to
            write.
          </p>
          <p>2. Enter an optional 'Bried'.</p>
          <p>3. Enter an optional 'Description'.</p>
          <p>
            4. Once you are satisfied with everything, you can click on the
            'Create Story' button.
          </p>
          <p>
            5. You may also click on this button to start our on-boarding
            process that will take you through a step-by-step guide on getting
            started with writing a new story!
          </p>

          <br></br>

          <h2 className="test-2xl font-bold">Editing Your Profile</h2>

          <p>
            You can navigate to this page by clicking on your profile on the top
            right corner and clickingon 'My Profile'.
          </p>

          <Image
            alt=" profile_page"
            src={ProfilePage}
            width={1000}
            height={500}
          ></Image>

          <p>
            1. Click on the **Edit Profile"** button to update your bio and
            other necessary information.{' '}
          </p>

          <br></br>

          <Image
            alt="edit_profile"
            src={EditProfile}
            width={1000}
            height={500}
          ></Image>

          <p>1. Update your 'Name'.</p>
          <p>2. Update your 'Email'.</p>
          <p>3. Add/update your 'Bio'.</p>
          <p>
            4. Once you are done you may click on the 'Update Profile' button.
          </p>
          <p>
            5. If you wish to no longer have the account, you can click on the
            'Delete Account' button.
          </p>
        </div>

        <br></br>
        <br></br>
        <br></br>

        <h1 className="text-3xl font-bold">User Manual</h1>

        <p className="text-lg">
          Please refer to the{' '}
          <Button variant={'link'}>
            {' '}
            <Link href={'https://docs.writeme.co.za/docs/User'} target="_blank">
              User Manual
            </Link>
          </Button>{' '}
          for in depth guides on how to use the platform.
        </p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
