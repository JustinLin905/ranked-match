"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Edit2,
	Loader2,
	User,
	Mail,
	Phone,
	Instagram,
	MessageCircle,
	LogOut,
} from "lucide-react";
import Link from "next/link";

interface ProfileData {
	email: string;
	firstName?: string;
	lastName?: string;
	program?: string;
	bio?: string;
	highlights?: string[];
	tags?: string[];
	term?: string;
	sequence?: Record<string, boolean>;
	instagram?: string;
	discord?: string;
	phone?: string;
}

const TERM_LABELS: Record<string, string> = {
	TERM_1A: "1A",
	TERM_1B: "1B",
	TERM_2A: "2A",
	TERM_2B: "2B",
	TERM_3A: "3A",
	TERM_3B: "3B",
	TERM_4A: "4A",
	TERM_4B: "4B",
	TERM_5A: "5A",
	TERM_5B: "5B",
};

const SEMESTER_TERM_LABELS: Record<string, string> = {
	F24: "Fall 2024",
	W25: "Winter 2025",
	S25: "Spring 2025",
	F25: "Fall 2025",
	W26: "Winter 2026",
	S26: "Spring 2026",
	F26: "Fall 2026",
	W27: "Winter 2027",
	S27: "Spring 2027",
	F27: "Fall 2027",
	W28: "Winter 2028",
	S28: "Spring 2028",
	F28: "Fall 2028",
	W29: "Winter 2029",
	S29: "Spring 2029",
};

export default function ProfilePage() {
	const router = useRouter();
	const [profile, setProfile] = useState<ProfileData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	useEffect(() => {
		async function fetchProfile() {
			try {
				const response = await fetch("/api/profile");

				if (!response.ok) {
					if (response.status === 401) {
						router.push("/login");
						return;
					}
					throw new Error("Failed to fetch profile");
				}

				const data = await response.json();
				setProfile(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load profile");
			} finally {
				setLoading(false);
			}
		}

		fetchProfile();
	}, [router]);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.error("Error logging out:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	if (error || !profile) {
		return (
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle>Error</CardTitle>
						<CardDescription>{error || "Profile not found"}</CardDescription>
					</CardHeader>
					<CardContent>
						<Button onClick={() => router.push("/postings")}>
							Back to Postings
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const activeTerms = profile.sequence
		? Object.entries(profile.sequence)
				.filter(([_, active]) => active)
				.map(([term, _]) => term)
		: [];

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<Link href="/postings">
						<Button variant="ghost">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Postings
						</Button>
					</Link>
					<div className="flex items-center gap-3">
						<Link href="/profile/edit">
							<Button>
								<Edit2 className="mr-2 h-4 w-4" />
								Edit Profile
							</Button>
						</Link>
						<Button
							variant="outline"
							onClick={handleLogout}
							disabled={isLoggingOut}
							className="border-red-300 text-red-700 hover:bg-red-50"
						>
							<LogOut className="mr-2 h-4 w-4" />
							{isLoggingOut ? "Logging out..." : "Logout"}
						</Button>
					</div>
				</div>

				{/* Profile Header */}
				<Card className="border-2">
					<CardHeader>
						<div className="flex items-center gap-4">
							<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
								<User className="h-8 w-8 text-primary" />
							</div>
							<div>
								<CardTitle className="text-3xl">
									{profile.firstName} {profile.lastName}
								</CardTitle>
								<CardDescription className="text-lg">
									{profile.program}
								</CardDescription>
							</div>
						</div>
					</CardHeader>
				</Card>

				{/* Basic Information */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Email
							</label>
							<div className="flex items-center gap-2 mt-1">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<p className="text-base">{profile.email}</p>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Current Term
							</label>
							<p className="text-base mt-1">
								{profile.term ? TERM_LABELS[profile.term] : "Not set"}
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Bio */}
				<Card>
					<CardHeader>
						<CardTitle>Bio</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-base leading-relaxed">
							{profile.bio || "No bio added yet"}
						</p>
					</CardContent>
				</Card>

				{/* Highlights */}
				{profile.highlights && profile.highlights.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Highlights</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{profile.highlights.map((highlight, index) => (
									<Badge
										key={index}
										variant="secondary"
										className="text-sm py-2 px-3"
									>
										{highlight}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Interests & Activities */}
				{profile.tags && profile.tags.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Interests & Activities</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{profile.tags.map((tag) => (
									<Badge
										key={tag}
										variant="default"
										className="text-sm py-2 px-3"
									>
										{tag}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Active Terms */}
				{activeTerms.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Active Terms</CardTitle>
							<CardDescription>
								When you'll be available for activities
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{activeTerms.map((term) => (
									<Badge
										key={term}
										variant="outline"
										className="text-sm py-2 px-3"
									>
										{SEMESTER_TERM_LABELS[term] || term}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Contact Information */}
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
						<CardDescription>How matches can reach you</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4 text-muted-foreground" />
							<p className="text-base">
								{profile.phone || (
									<span className="text-muted-foreground italic">
										Not provided
									</span>
								)}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<MessageCircle className="h-4 w-4 text-muted-foreground" />
							<p className="text-base">
								{profile.discord || (
									<span className="text-muted-foreground italic">
										Not provided
									</span>
								)}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Instagram className="h-4 w-4 text-muted-foreground" />
							<p className="text-base">
								{profile.instagram || (
									<span className="text-muted-foreground italic">
										Not provided
									</span>
								)}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
