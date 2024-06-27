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