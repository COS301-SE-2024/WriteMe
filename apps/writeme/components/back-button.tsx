"use client"

import { Button } from '@writeme/wmc'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BackButton() {

    const router = useRouter();
  return (
    <Button variant="secondary" onClick={() => router.back()} className='mx-4 mt-2'><ArrowLeft></ArrowLeft></Button>
  )
}
