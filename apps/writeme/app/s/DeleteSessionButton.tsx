"use client";

import React from 'react';
import { Button } from '@writeme/wmc';
import { deleteSession, deleteViewableSession } from '../../services/client-services';
import {useRouter} from "next/navigation";
import {useToast} from "@writeme/wmc/lib/ui/use-toast"
interface DeleteSessionButtonProps {
  sessionType: string,
  id: string
}

const DeleteSessionButton = ({id, sessionType}: DeleteSessionButtonProps) => {
  const router = useRouter();
  const {toast} = useToast();

  return (
    <Button onClick={async () => {
      if (sessionType == "viewable"){
        try {
          await deleteViewableSession(id)
          toast({
            title: "Session Ended!"
          })
          router.refresh();
        }catch (e) {
          toast({
            title: "Failed to End Session",
            variant: 'destructive'
          })
        }
      }else {
        try {
          await deleteSession(id);
          toast({
            title: "Session Ended!"
          })
          router.refresh();

        }catch (e) {
          toast({
            title: "Failed to End Session",
            variant: 'destructive'
          })
        }
      }
  }} variant={'destructive'}>
      End Session
    </Button>
  );
};

export default DeleteSessionButton;
