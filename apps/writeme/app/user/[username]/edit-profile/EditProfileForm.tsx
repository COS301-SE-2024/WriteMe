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

// export interface EditProfileProps {
//   params: {
//     username: string
//   }
// }

const EditProfileForm = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  // console.log(props.params.username)
  const onUpdateUser = async (name: string, email: string, bio: string) => {
    setError(false);
    // e.preventDefault();
    // console.log(bio)

    const values = {
      name: name,
      email: email,
      bio: bio
    }

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

      // router.push(`/user/${user?.id}`);

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
              onUpdateUser(data.name, data.email, data.bio as string)
            }}
            formSchema={updateUserSchema}
            fieldConfig={{
              bio: {
                inputProps: {
                  placeholder: "Tell us a little bit about yourself",
                }
              }
            }}
            >
            <AutoFormSubmit>Update profile</AutoFormSubmit>
          </AutoForm>
      </CardContent>
    </Card>
  )
}

export default EditProfileForm