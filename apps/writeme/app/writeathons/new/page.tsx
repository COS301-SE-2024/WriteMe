'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@writeme/wmc'
import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form'
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar'
import { writeathonSchema } from 'apps/writeme/db/story-schema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from '@writeme/wmc/lib/ui/use-toast';

const Writeathons = () => {
  const router = useRouter();

  const onWriteathonCreate = async (title: string, description: string, brief: string, startDate: Date, endDate: Date) => {
    const values = {
      title: title,
      description: description,
      brief: brief,
      startDate: startDate,
      endDate: endDate
    }

    try {
      const res = await fetch('/api/writeathons', {
        method: 'POST',
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
      }
      toast({
        title: 'Writeathon Created',
        variant: "default"
      })

      router.push(`/writeathons`);

    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      
    }
  }
  
  return (
    <>
      <LocalNavbar />
      <Card className="mx-auto max-w-sm mt-8">
        <CardHeader>
            <CardTitle className="text-2xl">Create a Writeathon</CardTitle>
          </CardHeader>
        <CardContent>
            <AutoForm
              onSubmit={(data) => {
                onWriteathonCreate(data.title, data.description, data.brief, data.startDate as Date, data.endDate as Date)
              }}
              formSchema={writeathonSchema}
              values={{
                
              }}
              fieldConfig={{
               startDate: {
                fieldType: 'date'
               },
               endDate: {
                fieldType: 'date'
               },
               description: {
                fieldType: 'textarea'
               },
               brief: {
                fieldType: 'textarea'
               }
              }}
              >
              <AutoFormSubmit>Create</AutoFormSubmit>
            </AutoForm>
        </CardContent>
      </Card>
    </>
  )
}

export default Writeathons