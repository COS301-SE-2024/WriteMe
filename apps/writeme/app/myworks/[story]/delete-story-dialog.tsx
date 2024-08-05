'use client';

import {
  AlertDialogAction,
} from '@writeme/wmc/lib/ui/alert-dialog';
import { Button } from '@writeme/wmc/lib/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DeleteStoryDialogProps {
  id: string;
}

export function DeleteStoryDialog({id}: DeleteStoryDialogProps) {
  const router = useRouter();


  return (
    <Button asChild variant="destructive" onClick={async () => {
      try {
        // setSubmitting(true);
        const res = await fetch('/api/story', {
          method: 'DELETE',
          body: JSON.stringify({id}),
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
          router.replace("/myworks")
          toast("Successfully Deleted")
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
      <AlertDialogAction>Continue</AlertDialogAction>
    </Button>
  );
}
