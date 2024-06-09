'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUserSchema, UpdateUserInput } from '../../../../db/user-schema';
import AutoForm, { AutoFormSubmit } from '@writeme/wmc/lib/ui/auto-form'
import { toast } from '@writeme/wmc/lib/ui/use-toast';
import { getUser } from 'apps/writeme/services/users';
import { isEmailUnique } from 'apps/writeme/services/users';
import { Trash2 } from 'lucide-react';

export interface EditProfileProps {
  user: {
    id: string,
    name: string,
    bio: string,
    email: string,
    password: string
  }
}

const EditProfileForm = (props: EditProfileProps) => {

  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleDelete = async () => {

  }

  const onUpdateUser = async (name: string, email: string, bio: string, password: string) => {
    setError(false);
    // e.preventDefault();
    // console.log(bio)

    const values = {
      name: name,
      email: email,
      bio: bio,
      password: password
    }

    // const result = isEmailUnique(email)

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
          <AutoForm
            onSubmit={(data) => {
              onUpdateUser(data.name, data.email, data.bio as string, data.password)
            }}
            formSchema={updateUserSchema}
            fieldConfig={{
              name: {
                inputProps: {
                  defaultValue: props.user.name
                }
              },
              email: {
                inputProps: {
                  defaultValue: props.user.email
                }
              },
              bio: {
                inputProps: {
                  defaultValue: props.user.bio,
                  placeholder: "Tell us a little bit about yourself",
                }
              },
              password: {
                inputProps: {
                  type: "password",
                  defaultValue: props.user.password,
                }
              }
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
      </CardContent>
    </Card>
  )
}

export default EditProfileForm