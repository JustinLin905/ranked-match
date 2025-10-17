"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import Link from "next/link";

const setupSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	program: z.string().min(1, "Program is required"),
	bio: z
		.string()
		.min(10, "Bio must be at least 10 characters")
		.max(500, "Bio must be less than 500 characters"),
	highlights: z.array(z.string()).min(1, "Add at least one highlight"),
	tags: z.array(z.string()).min(1, "Select at least one interest"),
	term: z.enum(["F24", "W25", "S25", "F25", "W26"]),
	sequence: z.record(z.boolean()),
	instagram: z.string().optional(),
	discord: z.string().optional(),
	phone: z.string().optional(),
});

type SetupFormData = z.infer<typeof setupSchema>;

const AVAILABLE_TAGS = [
	"Intramurals",
	"Sports",
	"Gaming",
	"Music",
	"Art",
	"Design",
	"Tech",
	"Business",
	"Volunteering",
	"Fitness",
	"Cooking",
	"Photography",
	"Travel",
	"Reading",
	"Writing",
	"Dance",
];

const TERMS = [
	{ value: "F24", label: "Fall 2024" },
	{ value: "W25", label: "Winter 2025" },
	{ value: "S25", label: "Spring 2025" },
	{ value: "F25", label: "Fall 2025" },
	{ value: "W26", label: "Winter 2026" },
];

export default function SetupPage() {
	const [step, setStep] = useState(1);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [highlights, setHighlights] = useState<string[]>([]);
	const [highlightInput, setHighlightInput] = useState("");
	const [termSequence, setTermSequence] = useState<Record<string, boolean>>({
		F24: false,
		W25: false,
		S25: false,
		F25: false,
		W26: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		setValue,
		watch,
	} = useForm<SetupFormData>({
		resolver: zodResolver(setupSchema),
		defaultValues: {
			highlights: [],
			tags: [],
			sequence: termSequence,
		},
	});

	const currentTerm = watch("term");

	const toggleTag = (tag: string) => {
		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
		setSelectedTags(newTags);
		setValue("tags", newTags);
	};

	const addHighlight = () => {
		if (highlightInput.trim() && highlights.length < 5) {
			const newHighlights = [...highlights, highlightInput.trim()];
			setHighlights(newHighlights);
			setValue("highlights", newHighlights);
			setHighlightInput("");
		}
	};

	const removeHighlight = (index: number) => {
		const newHighlights = highlights.filter((_, i) => i !== index);
		setHighlights(newHighlights);
		setValue("highlights", newHighlights);
	};

	const toggleTermSequence = (term: string) => {
		const newSequence = { ...termSequence, [term]: !termSequence[term] };
		setTermSequence(newSequence);
		setValue("sequence", newSequence);
	};

	const nextStep = async () => {
		let fieldsToValidate: (keyof SetupFormData)[] = [];

		if (step === 1) {
			fieldsToValidate = ["firstName", "lastName", "program"];
		} else if (step === 2) {
			fieldsToValidate = ["bio", "highlights", "tags"];
		} else if (step === 3) {
			fieldsToValidate = ["term", "sequence"];
		}

		const isValid = await trigger(fieldsToValidate);
		if (isValid) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const onSubmit = async (data: SetupFormData) => {
		console.log("[v0] Setup form submitted:", data);
		// TODO: Send data to API
		// For now, just log and redirect
		alert("Profile setup complete!");
	};

	return (
		<div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
			{/* Decorative blobs */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

			<div className="w-full max-w-2xl relative z-10">
				<div className="text-center mb-8">
					<Link href="/" className="inline-block mb-4">
						<h1 className="text-3xl font-bold">RankedMatch</h1>
					</Link>
					<p className="text-muted-foreground">
						Step {step} of 4 - Let's set up your profile
					</p>
					<div className="flex gap-2 justify-center mt-4">
						{[1, 2, 3, 4].map((s) => (
							<div
								key={s}
								className={`h-2 w-12 rounded-full transition-colors ${
									s <= step ? "bg-primary" : "bg-muted"
								}`}
							/>
						))}
					</div>
				</div>

				<Card className="border-2">
					<CardHeader>
						<CardTitle>
							{step === 1 && "Basic Information"}
							{step === 2 && "About You"}
							{step === 3 && "Terms & Availability"}
							{step === 4 && "Connect (Optional)"}
						</CardTitle>
						<CardDescription>
							{step === 1 && "Tell us who you are"}
							{step === 2 && "Share your interests and highlights"}
							{step === 3 && "When will you be active?"}
							{step === 4 && "Add your social handles to connect with matches"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{/* Step 1: Basic Info */}
							{step === 1 && (
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="firstName">First Name</Label>
											<Input
												id="firstName"
												{...register("firstName")}
												placeholder="John"
											/>
											{errors.firstName && (
												<p className="text-sm text-destructive">
													{errors.firstName.message}
												</p>
											)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">Last Name</Label>
											<Input
												id="lastName"
												{...register("lastName")}
												placeholder="Doe"
											/>
											{errors.lastName && (
												<p className="text-sm text-destructive">
													{errors.lastName.message}
												</p>
											)}
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="program">Program / Major</Label>
										<Input
											id="program"
											{...register("program")}
											placeholder="Computer Science"
										/>
										{errors.program && (
											<p className="text-sm text-destructive">
												{errors.program.message}
											</p>
										)}
									</div>
								</div>
							)}

							{/* Step 2: About You */}
							{step === 2 && (
								<div className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="bio">Bio</Label>
										<Textarea
											id="bio"
											{...register("bio")}
											placeholder="Tell us about yourself... What are you passionate about? What are you looking for in a friend group?"
											rows={4}
											className="resize-none"
										/>
										{errors.bio && (
											<p className="text-sm text-destructive">
												{errors.bio.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label>Highlights (Max 5)</Label>
										<p className="text-sm text-muted-foreground">
											Add key things about you that others should know
										</p>
										<div className="flex gap-2">
											<Input
												value={highlightInput}
												onChange={(e) => setHighlightInput(e.target.value)}
												placeholder="e.g., Love hiking, Coffee enthusiast"
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														addHighlight();
													}
												}}
											/>
											<Button
												type="button"
												onClick={addHighlight}
												disabled={highlights.length >= 5}
											>
												Add
											</Button>
										</div>
										<div className="flex flex-wrap gap-2 mt-2">
											{highlights.map((highlight, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-sm py-1 px-3"
												>
													{highlight}
													<button
														type="button"
														onClick={() => removeHighlight(index)}
														className="ml-2 hover:text-destructive"
													>
														<X className="h-3 w-3" />
													</button>
												</Badge>
											))}
										</div>
										{errors.highlights && (
											<p className="text-sm text-destructive">
												{errors.highlights.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label>Interests & Activities</Label>
										<p className="text-sm text-muted-foreground">
											Select all that apply
										</p>
										<div className="flex flex-wrap gap-2">
											{AVAILABLE_TAGS.map((tag) => (
												<Badge
													key={tag}
													variant={
														selectedTags.includes(tag) ? "default" : "outline"
													}
													className="cursor-pointer hover:scale-105 transition-transform"
													onClick={() => toggleTag(tag)}
												>
													{tag}
												</Badge>
											))}
										</div>
										{errors.tags && (
											<p className="text-sm text-destructive">
												{errors.tags.message}
											</p>
										)}
									</div>
								</div>
							)}

							{/* Step 3: Terms & Availability */}
							{step === 3 && (
								<div className="space-y-6">
									<div className="space-y-2">
										<Label>Current Term</Label>
										<div className="grid grid-cols-2 gap-2">
											{TERMS.map((term) => (
												<label
													key={term.value}
													className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
														currentTerm === term.value
															? "border-primary bg-primary/5"
															: "border-border hover:border-primary/50"
													}`}
												>
													<input
														type="radio"
														value={term.value}
														{...register("term")}
														className="sr-only"
													/>
													<span className="font-medium">{term.label}</span>
												</label>
											))}
										</div>
										{errors.term && (
											<p className="text-sm text-destructive">
												{errors.term.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label>Active Terms</Label>
										<p className="text-sm text-muted-foreground">
											Select which terms you'll be available for activities
										</p>
										<div className="space-y-2">
											{TERMS.map((term) => (
												<div
													key={term.value}
													className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
												>
													<Checkbox
														id={`term-${term.value}`}
														checked={termSequence[term.value]}
														onCheckedChange={() =>
															toggleTermSequence(term.value)
														}
													/>
													<label
														htmlFor={`term-${term.value}`}
														className="flex-1 cursor-pointer"
													>
														{term.label}
													</label>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Step 4: Connect */}
							{step === 4 && (
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="instagram">Instagram Handle</Label>
										<Input
											id="instagram"
											{...register("instagram")}
											placeholder="@username"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="discord">Discord Username</Label>
										<Input
											id="discord"
											{...register("discord")}
											placeholder="username#1234"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number</Label>
										<Input
											id="phone"
											{...register("phone")}
											placeholder="+1 (555) 123-4567"
										/>
									</div>
									<p className="text-sm text-muted-foreground">
										These are optional and will only be shared with your matches
									</p>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between pt-4">
								{step > 1 && (
									<Button type="button" variant="outline" onClick={prevStep}>
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
								)}
								{step < 4 ? (
									<Button type="button" onClick={nextStep} className="ml-auto">
										Next
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								) : (
									<Button type="submit" className="ml-auto">
										Complete Setup
									</Button>
								)}
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
