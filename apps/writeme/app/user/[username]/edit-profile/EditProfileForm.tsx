'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, UpdateUserInput } from '../../../../db/user-schema';
import { useToast } from '@writeme/wmc/lib/ui/use-toast';
import AutoForm, { AutoFormSubmit } from '../../../../../../wmc/src/lib/ui/auto-form'

const EditProfileForm = () => {
  return (
    // name: string({ required_error: 'Name is required' }).min(
    //   1,
    //   'Name is required'
    // ),
    // email: string({ required_error: 'Email is required' })
    //   .min(1, 'Email is required')
    //   .email('Invalid email'),
    // photo: string().optional()
    <Card className="mx-auto max-w-sm mt-8">
      <CardHeader>
          <CardTitle className="text-2xl">Edit your profile</CardTitle>
        </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <AutoForm
            className='flex flex-col gap-2'
            formSchema={updateUserSchema}
            >
            <AutoFormSubmit>Update profile</AutoFormSubmit>
          </AutoForm>
        </div>
      </CardContent>
    </Card>
  )
}

export default EditProfileForm