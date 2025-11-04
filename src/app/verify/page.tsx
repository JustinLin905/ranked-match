"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found");
      return;
    }

    async function verifyToken() {
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Successfully signed in!");
          // Redirect to postings page after 2 seconds
          setTimeout(() => {
            router.push("/postings");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(result.error || "Failed to verify token");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Failed to verify token");
      }
    }

    verifyToken();
  }, [token, router]);

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
              {status === "loading" && (
                <>
                  Verifying <span className="italic text-primary">token</span>
                </>
              )}
              {status === "success" && (
                <>
                  Welcome <span className="italic text-primary">back</span>
                </>
              )}
              {status === "error" && (
                <>
                  Verification{" "}
                  <span className="italic text-primary">failed</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {status === "loading" &&
                "Please wait while we verify your magic link..."}
              {status === "success" && "Redirecting you to your account..."}
              {status === "error" && "There was a problem verifying your link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center p-8">
                {status === "loading" && (
                  <Loader2 className="h-16 w-16 text-primary animate-spin" />
                )}
                {status === "success" && (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                )}
                {status === "error" && (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>

              {status === "error" && (
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <Link href="/login">Request New Link</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-11 rounded-xl border-2"
                  >
                    <Link href="/">Go Home</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
