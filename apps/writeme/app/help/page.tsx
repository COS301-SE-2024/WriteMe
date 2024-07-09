import { Button } from "@writeme/wmc";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@writeme/wmc/lib/ui/accordion";
import LocalNavbar from "@writeme/wmc/lib/ui/local-navbar";
import Link from "next/link";


export default function Help(){
    return (
        <>
            <LocalNavbar></LocalNavbar>

            <div className="flex flex-col items-center">

                <h2 className="text-2xl">FAQ</h2>

                <Accordion type="multiple">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>When I create a chapter can everyone see it?</AccordionTrigger>
                    <AccordionContent>
                      No, not until you have explicity published said chapter.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                    <AccordionTrigger>When I create a story can everyone see it?</AccordionTrigger>
                    <AccordionContent>
                      No, it is only visible to you until published
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                    <AccordionTrigger>When I create a story do I have to create a chapter?</AccordionTrigger>
                    <AccordionContent>
                      Yes, but you can have as many or as little chapters as you want
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                    <AccordionTrigger>How do I find other people's work?</AccordionTrigger>
                    <AccordionContent>
                      Click the 'Explore' tab at the top of the page and you will be able to see work published to the public by other authors
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                    <AccordionTrigger>How do I create a new story?</AccordionTrigger>
                    <AccordionContent>
                      Click the 'New Story' at the top of the page and you will be directed to a page where you can create a brand new story.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                    <AccordionTrigger>How do I publish a story?</AccordionTrigger>
                    <AccordionContent>
                      When you in the story editor, click the 'Publish' button in the top right of the screen
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                    <AccordionTrigger>Can other people edit my stories?</AccordionTrigger>
                    <AccordionContent>
                      Other people can only edit your story if you are collaborating on a story with them.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                    <AccordionTrigger>How do I comment on a specific chapter?</AccordionTrigger>
                    <AccordionContent>
                      While you are reading a certain chapter. You will be able to leave comments on that specific chapter on the right hand side of the screen.
                    </AccordionContent>
                    </AccordionItem>
                    
                </Accordion>

                <h2 className="text-2xl">
                    Guides
                </h2>
                <h3></h3>


                <h2 className="text-2xl">User Manual</h2>

                <p className="text-lg">
                    Please refer to the <Button variant={"link"}> <Link href={"https://docs.writeme.co.za/docs/User"} target="_blank">user manual</Link></Button> for in depth guides on how to use the platform.
                </p>
            </div>



        </>
    )
}