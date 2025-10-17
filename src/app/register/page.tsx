"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-secondary/20 blur-3xl" />
      <div className="absolute top-1/2 right-[20%] w-48 h-48 rounded-full bg-accent/15 blur-2xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <Users className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold">RankedMatch</span>
        </Link>

        <Card className="border-4 rounded-[2rem] shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-bold">
              Get <span className="italic text-primary">started</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter your email to create an account and start matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center p-6 bg-primary/10 rounded-xl">
                <Mail className="h-16 w-16 text-primary" />
              </div>

              <div className="space-y-4 text-center">
                <h3 className="text-xl font-semibold">
                  Passwordless Registration
                </h3>
                <p className="text-muted-foreground">
                  We use passwordless authentication for a simpler and more
                  secure experience. Your account is automatically created when
                  you sign in with your email for the first time.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm">
                    <strong>How it works:</strong>
                  </p>
                  <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
                    <li>Click the button below to go to the login page</li>
                    <li>Enter your email address</li>
                    <li>Receive a magic link in your email</li>
                    <li>Click the link to sign in and complete your profile</li>
                  </ol>
                </div>

                <Button
                  asChild
                  className="w-full h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Link href="/login">
                    Get Started with Email
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
