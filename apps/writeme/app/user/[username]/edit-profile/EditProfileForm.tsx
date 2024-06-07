'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUserSchema, UpdateUserInput } from '../../../../db/user-schema';
import { useToast } from '@writeme/wmc/lib/ui/use-toast';
import AutoForm, { AutoFormSubmit } from '../../../../../../wmc/src/lib/ui/auto-form'

const EditProfileForm = () => {
  return (
    <Card className="mx-auto max-w-sm mt-8">
      <CardHeader>
          <CardTitle className="text-2xl">Edit your profile</CardTitle>
        </CardHeader>
      <CardContent>
          <AutoForm
            formSchema={updateUserSchema}
            >
            <AutoFormSubmit>Update profile</AutoFormSubmit>
          </AutoForm>
      </CardContent>
    </Card>
  )
}

export default EditProfileForm