'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@writeme/wmc';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema, LoginUserInput } from '../../../db/user-schema';
import { signIn } from 'next-auth/react';
import { useToast } from '@writeme/wmc/lib/ui/use-toast';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/myworks';

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema)
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors }
  } = methods;
  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl
      });

      setSubmitting(false);

      if (!res?.error) {
        toast({
          title: 'Successfully Logged In',
          variant: 'default'
        });
        router.push(callbackUrl);
      } else {
        reset({ password: '' });
        const message = 'invalid email or password';
        toast({
          title: message,
          variant: 'destructive'
        });
        setError(message);
      }
    } catch (error: any) {
      toast({
        title: error,
        variant: 'destructive'
      });
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Card className="mx-auto max-w-sm mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid gap-4">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/*<Link*/}
                  {/*  href="#"*/}
                  {/*  className="ml-auto inline-block text-sm underline"*/}
                  {/*>*/}
                  {/*  Forgot your password?*/}
                  {/*</Link>*/}
                </div>
                <Input id="password" type="password" required  {...register("password")}/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <Button variant="outline" className="w-full" onClick={() => signIn('google', { callbackUrl })}>
              Login with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => signIn('github', { callbackUrl })}>
              Login with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
    ;
}
