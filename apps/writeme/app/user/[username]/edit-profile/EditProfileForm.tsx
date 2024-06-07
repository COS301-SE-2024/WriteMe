'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema, UpdateUserInput } from '../../../../db/user-schema';
import { useToast } from '@writeme/wmc/lib/ui/use-toast';

const EditProfileForm = () => {
  return (
    <div>EditProfile</div>
  )
}

export default EditProfileForm