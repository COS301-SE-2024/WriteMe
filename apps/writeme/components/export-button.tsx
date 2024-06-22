"use client"

import { Button } from '@writeme/wmc';
import { Download } from 'lucide-react';
import { toast } from '@writeme/wmc/lib/ui/use-toast';

interface ExportButtonProps {
  storyId: string;
  chapterId? : string;
}

export default function ExportButton({storyId, chapterId}: ExportButtonProps){
  const handleExport = async () => {
    if (chapterId){
      const pdfWindow = window.open('about:blank');
      try {
        const res = await fetch('/api/export/chapter', {
          method: 'POST',
          body: JSON.stringify({ id: chapterId }),
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
        }
        toast({
          title: 'Exported Successfully',
          variant: "default"
        })

        // @ts-ignore
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        pdfWindow.location.href = url; // and here, we finally forward the data to the new window
        pdfWindow.focus();
      }catch (e) {
        pdfWindow.close();
      }

    }else {
      const pdfWindow = window.open('about:blank');
      try {
        const res = await fetch('/api/export/story', {
          method: 'POST',
          body: JSON.stringify({ id: storyId }),
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
        }
        toast({
          title: 'Exported Successfully',
          variant: "default"
        })

        // @ts-ignore
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        pdfWindow.location.href = url; // and here, we finally forward the data to the new window
        pdfWindow.focus();
      }catch (e) {
        pdfWindow.close();
      }

    }



  }

  return (
    <Button variant="ghost" size="icon" onClick={handleExport}>
      <Download></Download>
    </Button>
  )

}
