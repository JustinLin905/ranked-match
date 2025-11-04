"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Users, ArrowRight, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const loginSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.refine(
			(email) => email.endsWith("@uwaterloo.ca"),
			"Email must be a valid Waterloo email address (username@uwaterloo.ca)"
		),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: LoginFormValues) {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/request-login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to send magic link");
			}

			setIsSubmitted(true);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to send magic link"
			);
		} finally {
			setIsLoading(false);
		}
	}

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
							{isSubmitted ? (
								<span className="flex items-center justify-center gap-2">
									<CheckCircle className="h-8 w-8 text-green-500" />
									Check your <span className="italic text-primary">email</span>
								</span>
							) : (
								<>
									Welcome <span className="italic text-primary">back</span>
								</>
							)}
						</CardTitle>
						<CardDescription className="text-base">
							{isSubmitted
								? "We've sent you a magic link to sign in"
								: "Enter your email to receive a magic link"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isSubmitted ? (
							<div className="space-y-4">
								<div className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200 dark:border-green-800">
									<Mail className="h-12 w-12 text-green-600 dark:text-green-400" />
								</div>
								<div className="space-y-2 text-center">
									<p className="text-sm text-muted-foreground">
										We've sent a sign-in link to
										<span className="font-medium text-foreground">
											{form.getValues("email")}
										</span>
									</p>
									<p className="text-sm text-muted-foreground">
										Click the link in the email to sign in. The link will expire
										in 24 hours.
									</p>
								</div>
								<Button
									variant="outline"
									onClick={() => setIsSubmitted(false)}
									className="w-full h-11 rounded-xl border-2"
								>
									Send another link
								</Button>
							</div>
						) : (
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-5"
								>
									{error && (
										<div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800">
											<p className="text-sm text-red-600 dark:text-red-400">
												{error}
											</p>
										</div>
									)}

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-base">Email</FormLabel>
												<FormControl>
													<Input
														placeholder="username@uwaterloo.ca"
														type="email"
														className="h-11 rounded-xl border-2"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="p-4 bg-muted rounded-xl">
										<p className="text-sm text-muted-foreground">
											<strong>Passwordless sign-in:</strong> We'll send you a
											secure link to sign in without a password.
										</p>
									</div>

									<Button
										type="submit"
										disabled={isLoading}
										className="w-full h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
									>
										{isLoading ? (
											"Sending..."
										) : (
											<>
												Send Magic Link
												<ArrowRight className="ml-2 h-5 w-5" />
											</>
										)}
									</Button>
								</form>
							</Form>
						)}

						{!isSubmitted && (
							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Don't have an account?{" "}
									<Link
										href="/register"
										className="font-medium text-primary hover:underline"
									>
										Sign up
									</Link>
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
