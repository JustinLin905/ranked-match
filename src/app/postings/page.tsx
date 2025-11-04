"use client";

import {
	Heart,
	Users,
	Clock,
	Search,
	Sparkles,
	CheckCircle2,
	X,
	User,
	LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Tag {
	value: string;
}

interface UserProfile {
	email: string;
	firstName: string;
	lastName: string;
	program: string;
	tags: Tag[];
	bio?: string;
	term: string;
	highlights?: string[];
}

export default function PostingsPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [appliedUsers, setAppliedUsers] = useState<string[]>([]);
	const [users, setUsers] = useState<UserProfile[]>([]);
	const [availableTags, setAvailableTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState<{
		firstName?: string;
		lastName?: string;
	} | null>(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	// Load applied users from localStorage on mount
	useEffect(() => {
		const savedApplications = localStorage.getItem("appliedUsers");
		if (savedApplications) {
			setAppliedUsers(JSON.parse(savedApplications));
		}
	}, []);

	// Save applied users to localStorage whenever it changes
	useEffect(() => {
		if (appliedUsers.length > 0) {
			localStorage.setItem("appliedUsers", JSON.stringify(appliedUsers));
		}
	}, [appliedUsers]);

	// Fetch current user profile on mount
	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				const response = await fetch("/api/profile");
				if (response.ok) {
					const data = await response.json();
					setCurrentUser({
						firstName: data.firstName,
						lastName: data.lastName,
					});
				}
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		}
		fetchCurrentUser();
	}, []);

	// Fetch available tags on mount
	useEffect(() => {
		async function fetchTags() {
			try {
				const response = await fetch("/api/tags");
				if (response.ok) {
					const tags = await response.json();
					setAvailableTags(tags);
				}
			} catch (error) {
				console.error("Error fetching tags:", error);
			}
		}
		fetchTags();
	}, []);

	// Fetch users whenever search term or selected tags change
	useEffect(() => {
		async function fetchUsers() {
			setLoading(true);
			try {
				const params = new URLSearchParams();
				if (searchTerm) {
					params.append("search", searchTerm);
				}
				if (selectedTags.length > 0) {
					params.append("tags", selectedTags.join(","));
				}

				const response = await fetch(`/api/users?${params.toString()}`);
				if (response.ok) {
					const data = await response.json();
					setUsers(data);
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchUsers();
	}, [searchTerm, selectedTags]);

	const handleApply = (userId: string) => {
		setAppliedUsers(
			(prev) =>
				prev.includes(userId)
					? prev.filter((id) => id !== userId) // Remove if already applied (unapply)
					: [...prev, userId] // Add if not applied (apply)
		);
	};

	const handleTagToggle = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const clearFilters = () => {
		setSearchTerm("");
		setSelectedTags([]);
	};

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			const response = await fetch("/api/auth/logout", {
				method: "POST",
			});

			if (response.ok) {
				router.push("/login");
			}
		} catch (error) {
			console.error("Error logging out:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			{/* Decorative background blobs */}
			<div className="absolute top-20 right-[10%] w-64 h-64 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary/10 blur-3xl" />
			<div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-secondary/20 blur-3xl" />

			{/* Header */}
			<header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
								<Users className="h-6 w-6 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold">RankedMatch</span>
						</Link>
						<div className="flex items-center gap-4">
							<Link
								href="/profile"
								className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
							>
								<User className="h-4 w-4" />
								{currentUser?.firstName
									? `${currentUser.firstName}`
									: "Profile"}
							</Link>
							<button
								onClick={handleLogout}
								disabled={isLoggingOut}
								className="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50"
							>
								<LogOut className="h-4 w-4" />
								{isLoggingOut ? "Logging out..." : "Logout"}
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
				{/* Countdown Timer */}
				<Card className="mb-8 border-4 rounded-[2rem] overflow-hidden shadow-xl border-l-primary">
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
								<Clock className="h-7 w-7 text-primary" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-foreground">
									Next Matching Period
								</h2>
								<p className="text-3xl font-bold text-primary">3 days</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Search and Filter Section */}
				<Card className="mb-8 border-4 rounded-[2rem] shadow-xl">
					<CardContent className="p-6">
						<div className="space-y-5">
							{/* Search Bar */}
							<div className="relative">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Search by name, program, or interests..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-12 h-12 rounded-xl border-2 text-base"
								/>
							</div>

							{/* Tag Filters */}
							<div>
								<h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
									<Sparkles className="h-4 w-4 text-primary" />
									Filter by Interests:
								</h3>
								<div className="flex flex-wrap gap-2">
									{availableTags.map((tag) => (
										<Badge
											key={tag}
											variant={
												selectedTags.includes(tag) ? "default" : "outline"
											}
											className="cursor-pointer hover:scale-105 transition-transform text-sm py-1.5 px-3 rounded-full"
											onClick={() => handleTagToggle(tag)}
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>

							{/* Clear Filters */}
							{(searchTerm || selectedTags.length > 0) && (
								<Button
									variant="ghost"
									size="sm"
									onClick={clearFilters}
									className="text-primary hover:text-primary/80"
								>
									<X className="h-4 w-4 mr-1" />
									Clear all filters
								</Button>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Users List */}
				<Card className="border-4 rounded-[2rem] shadow-xl overflow-hidden">
					<div className="px-6 py-5 border-b border-border bg-secondary/20">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-foreground flex items-center gap-2">
								<Users className="h-5 w-5 text-primary" />
								Available Matches ({users.length})
							</h2>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<CheckCircle2 className="h-4 w-4 text-primary" />
								<span>
									Applied to{" "}
									<span className="font-bold text-primary">
										{appliedUsers.length}
									</span>{" "}
									users
								</span>
							</div>
						</div>
					</div>

					<div className="divide-y divide-border">
						{loading ? (
							<div className="px-6 py-16 text-center">
								<div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
								<p className="mt-4 text-muted-foreground font-medium">
									Loading matches...
								</p>
							</div>
						) : users.length === 0 ? (
							<div className="px-6 py-16 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
									<Users className="h-8 w-8 text-muted-foreground" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">
									No matches found
								</h3>
								<p className="text-muted-foreground">
									Try adjusting your search or filters
								</p>
							</div>
						) : (
							users.map((user) => (
								<UserCard
									key={user.email}
									user={user}
									isApplied={appliedUsers.includes(user.email)}
									onApply={() => handleApply(user.email)}
								/>
							))
						)}
					</div>
				</Card>
			</div>
		</div>
	);
}

interface UserCardProps {
	user: UserProfile;
	isApplied: boolean;
	onApply: () => void;
}

function UserCard({ user, isApplied, onApply }: UserCardProps) {
	// Format term to display (convert TERM_1A to 1A)
	const displayTerm = user.term.replace("TERM_", "");

	return (
		<div className="px-6 py-5 hover:bg-secondary/30 transition-colors">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-3 mb-2">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20 flex-shrink-0">
							<Users className="h-6 w-6 text-primary" />
						</div>
						<div className="min-w-0">
							<h3 className="text-lg font-bold text-foreground truncate">
								{user.firstName} {user.lastName}
							</h3>
							<p className="text-sm text-muted-foreground">
								{displayTerm} • {user.program}
							</p>
						</div>
					</div>

					{user.bio && (
						<p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
							{user.bio}
						</p>
					)}

					{user.highlights && user.highlights.length > 0 && (
						<div className="flex flex-wrap gap-1.5 mb-3">
							{user.highlights.map((highlight, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="text-xs rounded-full"
								>
									<Sparkles className="h-3 w-3 mr-1" />
									{highlight}
								</Badge>
							))}
						</div>
					)}

					{user.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{user.tags.map((tag) => (
								<Badge
									key={tag.value}
									variant="outline"
									className="text-xs rounded-full"
								>
									{tag.value}
								</Badge>
							))}
						</div>
					)}
				</div>

				<div className="flex-shrink-0">
					<Button
						onClick={onApply}
						size="lg"
						variant={isApplied ? "outline" : "default"}
						className={`rounded-full min-w-[120px] transition-all ${
							isApplied
								? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
								: "shadow-lg hover:shadow-xl hover:scale-105"
						}`}
					>
						{isApplied ? (
							<>
								<X className="h-4 w-4 mr-2" />
								Unapply
							</>
						) : (
							<>
								<Heart className="h-4 w-4 mr-2" />
								Apply
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
