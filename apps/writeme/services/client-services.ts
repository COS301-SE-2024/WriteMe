"use client";

import { upload } from 'next-upload/client'

export async function uploadFile(file: File){
    const res = await upload({file}, {
      api: "/upload"
    })


    const url = res[0].url +"/" + res[0].data.key;
    
    return url;
  }

export async function getSuggestions(input: string){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_AI_ENDPOINT + "/suggest", {
            method: 'post',
            body: JSON.stringify({
                input: input
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        })

        return await res.json();

    }catch(e:any){

    }

}

export async function getParaphrase(input: string){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_AI_ENDPOINT + "/suggest/paraphrase", {
            method: 'post',
            body: JSON.stringify({
                input: input
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        })

        return await res.json();

    }catch(e:any){

    }
}

export async function getGrammar(input: string){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_AI_ENDPOINT + "/grammar", {
            method: 'post',
            body: JSON.stringify({
                input: input
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        })

        return await res.json();

    }catch(e:any){

    }
}

export async function getEntities(input: string){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_AI_ENDPOINT + "/analysis", {
            method: 'post',
            body: JSON.stringify({
                input: input
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        })

        return await res.json();

    }catch(e:any){

    }
}

export async function getSentiment(input: string){
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_AI_ENDPOINT + "/sentiment", {
            method: 'post',
            body: JSON.stringify({
                input: input
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        })

        return await res.json();

    }catch(e:any){

    }
}
