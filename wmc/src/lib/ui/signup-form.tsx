"use client";
import React, { useState } from 'react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@writeme/wmc/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

import {useRouter, useSearchParams} from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserInput, createUserSchema} from '../../../../apps/writeme/db/user-schema';
import { signIn } from 'next-auth/react';
import { useToast } from '@writeme/wmc/lib/ui/use-toast';
import { Button } from '@writeme/wmc';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@writeme/wmc/lib/ui/tooltip';


export function SignupFormDemo() {

  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || '/myworks';
  const { toast } = useToast();


  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch('/api/register', {
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

      signIn(undefined, { callbackUrl: '/myworks' });
    } catch (error: any) {
      toast({
        title: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-5 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to WriteMe
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to WriteMe to begin your journey today.
      </p>

      <form className="my-6" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Name" type="text" {...register('name')}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="email@example.com" type="email" {...register("email")}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input 
                  id="password" 
                  placeholder="••••••••" 
                  type="password" 
                  {...register("password")} 
                />
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={40}>
                <p>Should contain: </p>
                <p>• More than 8 characters</p>
                <p>• Less than 32 characters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            placeholder="••••••••"
            type="password"
            {...register("passwordConfirm")}
          />
        </LabelInputContainer>

        <Button type="submit" className="w-full" variant="default">
          Sign up &rarr;
          <BottomGradient />
        </Button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={() => signIn('github', {
              callbackUrl
            })}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn text-center flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={() => {
              signIn('google', {callbackUrl})
            }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
                               children,
                               className,
                             }: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
