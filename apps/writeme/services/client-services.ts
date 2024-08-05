"use client";

import { upload } from 'next-upload/client'

export async function uploadFile(file: File){
    const res = await upload({file}, {
      api: "/upload"
    })


    const url = res[0].url +"/" + res[0].data.key;
    
    return url;
  }