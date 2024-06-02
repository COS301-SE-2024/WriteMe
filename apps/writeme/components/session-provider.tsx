"use client";
import { SessionProvider } from "next-auth/react"

import React from 'react'

const SessionWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>{children as React.ReactNode}</SessionProvider>
  )
}

export default SessionWrapper
