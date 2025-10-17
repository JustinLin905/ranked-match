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
import { Checkbox } from "@/components/ui/checkbox";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	function onSubmit(data: LoginFormValues) {
		console.log("[v0] Login form submitted:", data);
		// TODO: Implement actual login logic
		// If successful, navigate to dashboard
		router.push("/postings");
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
							Welcome <span className="italic text-primary">back</span>
						</CardTitle>
						<CardDescription className="text-base">
							Sign in to your account to continue matching
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Email</FormLabel>
											<FormControl>
												<Input
													placeholder="you@university.edu"
													type="email"
													className="h-11 rounded-xl border-2"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base">Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your password"
													type="password"
													className="h-11 rounded-xl border-2"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-center justify-between">
									<FormField
										control={form.control}
										name="rememberMe"
										render={({ field }) => (
											<FormItem className="flex items-center gap-2 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														className="rounded-md"
													/>
												</FormControl>
												<FormLabel className="text-sm font-normal cursor-pointer">
													Remember me
												</FormLabel>
											</FormItem>
										)}
									/>
									<Link
										href="/forgot-password"
										className="text-sm font-medium text-primary hover:underline"
									>
										Forgot password?
									</Link>
								</div>

								<Button
									type="submit"
									className="w-full h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
								>
									Sign In
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</form>
						</Form>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								Don't have an account?
								<Link
									href="/register"
									className="font-medium text-primary hover:underline"
								>
									{" "}
									Sign up
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
