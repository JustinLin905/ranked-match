"use client";

import { useState, useEffect } from "react";
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
import { ArrowRight, ArrowLeft, X, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
	term: z.enum([
		"TERM_1A",
		"TERM_1B",
		"TERM_2A",
		"TERM_2B",
		"TERM_3A",
		"TERM_3B",
		"TERM_4A",
		"TERM_4B",
	]),
	sequence: z
		.record(z.string(), z.boolean())
		.refine(
			(sequence) => Object.values(sequence).some(Boolean),
			"Please select at least one active term"
		),
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
	{ value: "TERM_1A", label: "1A" },
	{ value: "TERM_1B", label: "1B" },
	{ value: "TERM_2A", label: "2A" },
	{ value: "TERM_2B", label: "2B" },
	{ value: "TERM_3A", label: "3A" },
	{ value: "TERM_3B", label: "3B" },
	{ value: "TERM_4A", label: "4A" },
	{ value: "TERM_4B", label: "4B" },
];

const SEMESTER_TERMS = [
	{ value: "F24", label: "Fall 2024" },
	{ value: "W25", label: "Winter 2025" },
	{ value: "S25", label: "Spring 2025" },
	{ value: "F25", label: "Fall 2025" },
	{ value: "W26", label: "Winter 2026" },
	{ value: "S26", label: "Spring 2026" },
	{ value: "F26", label: "Fall 2026" },
	{ value: "W27", label: "Winter 2027" },
	{ value: "S27", label: "Spring 2027" },
	{ value: "F27", label: "Fall 2027" },
	{ value: "W28", label: "Winter 2028" },
	{ value: "S28", label: "Spring 2028" },
	{ value: "F28", label: "Fall 2028" },
	{ value: "W29", label: "Winter 2029" },
	{ value: "S29", label: "Spring 2029" },
];

export default function SetupPage() {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [highlights, setHighlights] = useState<string[]>([]);
	const [highlightInput, setHighlightInput] = useState("");
	const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
	const [termSequence, setTermSequence] = useState<Record<string, boolean>>({
		F24: false,
		W25: false,
		S25: false,
		F25: false,
		W26: false,
		S26: false,
		F26: false,
		W27: false,
		S27: false,
		F27: false,
		W28: false,
		S28: false,
		F28: false,
		W29: false,
		S29: false,
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

	// Helper functions for multi-select dropdown
	const getSelectedTerms = () => {
		return Object.entries(termSequence)
			.filter(([_, selected]) => selected)
			.map(([term, _]) => term);
	};

	const getSelectedTermsCount = () => {
		return getSelectedTerms().length;
	};

	const getSelectedTermsDisplay = () => {
		const selected = getSelectedTerms();
		if (selected.length === 0) return "Select terms...";
		if (selected.length === 1) {
			const term = SEMESTER_TERMS.find((t) => t.value === selected[0]);
			return term?.label || selected[0];
		}
		return `${selected.length} terms selected`;
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isTermDropdownOpen) {
				const target = event.target as Element;
				if (!target.closest('[data-dropdown="term-selector"]')) {
					setIsTermDropdownOpen(false);
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isTermDropdownOpen]);

	const nextStep = async () => {
		let fieldsToValidate: (keyof SetupFormData)[] = [];

		if (step === 1) {
			fieldsToValidate = ["firstName", "lastName", "program"];
		} else if (step === 2) {
			fieldsToValidate = ["bio", "highlights", "tags"];
		} else if (step === 3) {
			fieldsToValidate = ["term", "sequence"];
		} else if (step === 4) {
			// Step 4 is the last step - redirect to postings
			try {
				// TODO: Submit form data to API here
				console.log("Setup completed, redirecting to postings...");
				router.push("/postings");
				return;
			} catch (error) {
				console.error("Failed to complete setup:", error);
				return;
			}
		}
		// Step 4 is contact info (all optional), no validation needed

		const isValid =
			fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));

		if (isValid) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const onSubmit = async (data: SetupFormData) => {
		console.log("[v0] Setup form submitted:", data);

		try {
			// TODO: Send data to API
			// For now, just simulate success and redirect

			// Show success message briefly
			alert("Profile setup complete! Redirecting to postings...");

			// Redirect to postings page
			router.push("/postings");
		} catch (error) {
			console.error("Setup submission error:", error);
			alert("Failed to complete setup. Please try again.");
		}
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
							{step === 4 && "Contact Information"}
						</CardTitle>
						<CardDescription>
							{step === 1 && "Tell us who you are"}
							{step === 2 && "Share your interests and highlights"}
							{step === 3 && "When will you be active?"}
							{step === 4 && "How can matches contact you?"}
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
										<div className="relative" data-dropdown="term-selector">
											<button
												type="button"
												onClick={() =>
													setIsTermDropdownOpen(!isTermDropdownOpen)
												}
												className="w-full p-3 border border-border rounded-lg bg-background text-left flex items-center justify-between hover:border-primary/50 transition-colors"
											>
												<span
													className={
														getSelectedTermsCount() === 0
															? "text-muted-foreground"
															: ""
													}
												>
													{getSelectedTermsDisplay()}
												</span>
												<ChevronDown
													className={`h-4 w-4 transition-transform ${
														isTermDropdownOpen ? "rotate-180" : ""
													}`}
												/>
											</button>

											{isTermDropdownOpen && (
												<div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
													{SEMESTER_TERMS.map((term) => (
														<div
															key={term.value}
															onClick={() => toggleTermSequence(term.value)}
															className="flex items-center space-x-2 p-3 hover:bg-muted cursor-pointer transition-colors"
														>
															<div className="w-4 h-4 border border-border rounded flex items-center justify-center">
																{termSequence[term.value] && (
																	<Check className="h-3 w-3 text-primary" />
																)}
															</div>
															<span className="flex-1">{term.label}</span>
														</div>
													))}
												</div>
											)}
										</div>

										{getSelectedTermsCount() > 0 && (
											<div className="flex flex-wrap gap-1 mt-2">
												{getSelectedTerms().map((termValue) => {
													const term = SEMESTER_TERMS.find(
														(t) => t.value === termValue
													);
													return (
														<Badge
															key={termValue}
															variant="secondary"
															className="text-xs py-1 px-2"
														>
															{term?.label}
															<button
																type="button"
																onClick={() => toggleTermSequence(termValue)}
																className="ml-1 hover:text-destructive"
															>
																<X className="h-3 w-3" />
															</button>
														</Badge>
													);
												})}
											</div>
										)}
										{errors.sequence && (
											<p className="text-sm text-destructive">
												Please select at least one active term
											</p>
										)}
									</div>
								</div>
							)}

							{/* Step 4: Contact Information */}
							{step === 4 && (
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number (Optional)</Label>
										<Input
											id="phone"
											{...register("phone")}
											placeholder="+1 (555) 123-4567"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="discord">Discord Username (Optional)</Label>
										<Input
											id="discord"
											{...register("discord")}
											placeholder="username#1234"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="instagram">
											Instagram Handle (Optional)
										</Label>
										<Input
											id="instagram"
											{...register("instagram")}
											placeholder="@username"
										/>
									</div>
									<div className="p-4 bg-muted rounded-lg">
										<p className="text-sm text-muted-foreground">
											<strong>Note:</strong> All contact information is optional
											and will only be shared with your confirmed matches. You
											can update this anytime in your profile settings.
										</p>
									</div>
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
								<Button type="button" onClick={nextStep} className="ml-auto">
									{step === 4 ? "Complete Setup" : "Next"}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
