"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "@writeme/wmc";
import { AvatarFallback, AvatarImage } from "@writeme/wmc/lib/ui/avatar";
import { toast } from "@writeme/wmc/lib/ui/use-toast";
import FileUpload, { FileUploadContext } from "apps/writeme/components/FileUpload";
import { updateStoryCoverSchema } from "apps/writeme/db/story-schema";
import { useState } from "react";
// import Image from "next/image";

export default function UserImageUpload({user}: any) {
    const [currentFile, setCurrentFile] = useState(user.image|| "");

    return (
        <div className="flex flex-col items-center justify-center">
            <FileUploadContext.Provider value={{
                currentFile,
                setCurrentFile
            }}>
                <div className="h-48 aspect-square">
                  <Avatar className="w-full h-full object-contain min-h-0 ">
                    <AvatarImage src={currentFile}></AvatarImage>
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <FileUpload></FileUpload>
                <Button onClick={async () => {
                    try {
                        console.log(currentFile)
                        const values = updateStoryCoverSchema.parse({
                            id: user.id,
                            cover: currentFile
                        })
                        const res = await fetch('/api/user/cover', {
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
                            title: "Profile Image Updated",
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
                    Update Profile Image
                </Button>
            </FileUploadContext.Provider>
        </div>
    )
}