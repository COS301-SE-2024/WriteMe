'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUserSchema, updateUserSchemaOAuth, UpdateUserInput } from '../../../../db/user-schema';
import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form'
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { Trash2 } from 'lucide-react';
import UserImageUpload from './image-upload';

export interface EditProfileProps {
  user: {
    id: string,
    name: string,
    bio: string,
    email: string,
    password: string | null,
  }
}

const EditProfileForm = (props: EditProfileProps) => {

  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  
  const handleDelete = async () => {
    
  }
  
  const onUpdateUser = async (name: string, email: string, bio: string, password: string | null) => {
    setError(false);
    // console.log(email)
    const values = {
      name: name,
      email: email,
      bio: bio,
      password: password
    }
    console.log(values)

    try {
      setSubmitting(true);
      const res = await fetch('/api/register', {
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
      }
      toast({
        title: 'Profile Updated',
        variant: "default"
      })

      router.push(`/user/${props.user.id}`);
      // router.refresh()

    } catch (error: any) {
      setError(true);
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-8">
      <CardHeader>
          <CardTitle className="text-2xl">Edit your profile</CardTitle>
        </CardHeader>
      <CardContent>

        <UserImageUpload user={props.user}></UserImageUpload>

        {props.user.password ? 
          <AutoForm
            onSubmit={(data) => {
              onUpdateUser(data.name, data.email, data.bio as string, data.password!)
            }}
            formSchema={updateUserSchema}
            values={{
              name: props.user.name,
              email: props.user.email,
              bio: props.user.bio,
              // password: props.user.password
            }}
            fieldConfig={{
              bio: {
                inputProps: {
                  placeholder: "Tell us a little bit about yourself",
                },
                fieldType: "textarea"
              },
              password: {
                inputProps: {
                  type: "password",
                }
              },
            }}
            >
              <div className='grid grid-cols-2 gap-14'>
                <AutoFormSubmit>Update profile</AutoFormSubmit>
                <Button variant="destructive">
                  <Trash2 />
                  Delete account
                </Button>
              </div>
          </AutoForm> 
          : 
          <AutoForm
            onSubmit={(data) => {
              onUpdateUser(data.name, data.email, data.bio as string, null)
            }}
            formSchema={updateUserSchemaOAuth}
            values={{
              name: props.user.name,
              email: props.user.email,
              bio: props.user.bio,
            }}
            fieldConfig={{
              bio: {
                inputProps: {
                  placeholder: "Tell us a little bit about yourself",
                },
                fieldType: "textarea"
              },
            }}
            >
              <div className='grid grid-cols-2 gap-14'>
                <AutoFormSubmit>Update profile</AutoFormSubmit>
                <Button variant="destructive">
                  <Trash2 />
                  Delete account
                </Button>
              </div>
          </AutoForm>
         }
          
      </CardContent>
    </Card>
  )
}

export default EditProfileForm