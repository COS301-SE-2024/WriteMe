'use client';

import {
  AlertDialogAction,
} from '@writeme/wmc/lib/ui/alert-dialog';
import { Button } from '@writeme/wmc/lib/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '@writeme/wmc/lib/ui/use-toast';

interface DeleteStoryDialogProps {
  id: string,
}

export function DeleteStoryDialog(props: DeleteStoryDialogProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      // setSubmitting(true);
      const res = await fetch('/api/story', {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
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
        title: "Successfully Deleted",
        variant: "default"
      })

      router.push('/myworks')
      
    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      // setSubmitting(false);
    }
  } 

  return (
    <Button asChild variant="destructive" onClick={() => handleDelete(props.id)} >
      <AlertDialogAction>Delete</AlertDialogAction>
    </Button>
  );
}
