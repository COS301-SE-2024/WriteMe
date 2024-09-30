"use client";

import { Button } from "@writeme/wmc";
import { toast } from "@writeme/wmc/lib/ui/use-toast";
import FileUpload, { FileUploadContext } from "apps/writeme/components/FileUpload";
import { updateStoryCoverSchema } from "apps/writeme/db/story-schema";
import { useState } from "react";
// import Image from "next/image";

export default function ChapterImageUpload({chapter}: any) {
    const [currentFile, setCurrentFile] = useState(chapter.cover|| "");

    return (
        <div className="flex flex-col items-center justify-center">
            <FileUploadContext.Provider value={{
                currentFile,
                setCurrentFile
            }}>
                <div className="h-48">
                    <img className="w-full h-full object-contain min-h-0" alt={chapter.title} src={currentFile}></img>
                </div>
                <FileUpload></FileUpload>
                <Button onClick={async () => {
                    try {
                      
                        const values = updateStoryCoverSchema.parse({
                            id: chapter.id,
                            cover: currentFile
                        })
                        const res = await fetch('/api/chapter/cover', {
                          method: 'PUT',
                          body: JSON.stringify(values),
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        });
                  
                        if (!res.ok) {
                          const errorData = await res.json();
                  
                          if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                            errorData.errors.forEach((error: any) => {
                              toast({
                                title: error.message,
                                variant: 'destructive'
                              })
                            });
                  
                            return;
                          }
                  
                          toast({
                            title: errorData.message,
                            variant: 'destructive'
                          })
                          return;
                        }else {
                          const { story } = await res.json();
                          toast({
                            title: "Cover Updated",
                          })
                        }
                  
                      } catch (error: any) {
                        toast({
                          title: error.message,
                          variant: 'destructive'
                        })
                      } finally {
                        // setSubmitting(false);
                      }
                  
                }}>
                    Update Cover Image
                </Button>
            </FileUploadContext.Provider>
        </div>
    )
}