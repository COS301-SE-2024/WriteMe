"use client";
import Link from "next/link";

import { Button } from "@writeme/wmc/lib/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@writeme/wmc/lib/ui/card";
import { Input } from "@writeme/wmc/lib/ui/input";
import { Label } from "@writeme/wmc/lib/ui/label";
// import WriteMeLogo from "../assets/WriteMe.png";

export default function LoginForm() {
  return (
    <div>
      <nav className="p-12 flex justify-between items-center">
        {/* WriteMe logo */}
        <div className="flex items-center">
          <div style={{ width: "10rem" }}>
            {/* <img src={WriteMeLogo.src} alt="WriteMe Logo" /> */}
          </div>
        </div>
      </nav>

      <Card className="mx-auto max-w-sm mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
