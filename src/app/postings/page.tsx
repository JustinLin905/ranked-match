"use client";
import { Heart, Users, Clock, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { mockUsers, AVAILABLE_TAGS } from "@/data/mockData";
import { UserProfile } from "@/types";
import Link from "next/link";

export default function Postings() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [appliedUsers, setAppliedUsers] = useState<string[]>([]);

	// Filter users based on search term and selected tags
	const filteredUsers = useMemo(() => {
		return mockUsers.filter((user) => {
			const matchesSearch =
				searchTerm === "" ||
				user.publicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.tags.some((tag) =>
					tag.toLowerCase().includes(searchTerm.toLowerCase())
				);

			const matchesTags =
				selectedTags.length === 0 ||
				selectedTags.every((tag) => user.tags.includes(tag));

			return matchesSearch && matchesTags;
		});
	}, [searchTerm, selectedTags]);

	const handleApply = (userId: string) => {
		setAppliedUsers((prev) => [...prev, userId]);
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Heart className="h-8 w-8 text-pink-500" />
							<h1 className="text-2xl font-bold text-gray-900">Ranked Match</h1>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-sm text-gray-500">
								Find your perfect friend match
							</div>
							<Link
								href="/matching"
								className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
							>
								Start Matching
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Countdown Timer */}
				<div className="mb-8">
					<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
						<div className="flex items-center space-x-3">
							<Clock className="h-6 w-6 text-blue-500" />
							<div>
								<h2 className="text-lg font-semibold text-gray-900">
									Next Matching Period
								</h2>
								<p className="text-2xl font-bold text-blue-600">3d</p>
							</div>
						</div>
					</div>
				</div>

				{/* Search and Filter Section */}
				<div className="mb-8">
					<div className="bg-white rounded-lg shadow-md p-6">
						<div className="space-y-4">
							{/* Search Bar */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="text"
									placeholder="Search by title or tags..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
								/>
							</div>

							{/* Tag Filters */}
							<div>
								<h3 className="text-sm font-medium text-gray-700 mb-3">
									Filter by Tags:
								</h3>
								<div className="flex flex-wrap gap-2">
									{AVAILABLE_TAGS.map((tag) => (
										<button
											key={tag}
											onClick={() => handleTagToggle(tag)}
											className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
												selectedTags.includes(tag)
													? "bg-blue-500 text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
										>
											{tag}
										</button>
									))}
								</div>
							</div>

							{/* Clear Filters */}
							{(searchTerm || selectedTags.length > 0) && (
								<button
									onClick={clearFilters}
									className="text-sm text-blue-600 hover:text-blue-800 font-medium"
								>
									Clear all filters
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Users Table */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold text-gray-900">
								Available Matches ({filteredUsers.length})
							</h2>
							<div className="flex items-center space-x-2 text-sm text-gray-500">
								<Users className="h-4 w-4" />
								<span>Applied to {appliedUsers.length} users</span>
							</div>
						</div>
					</div>

					<div className="divide-y divide-gray-200">
						{filteredUsers.length === 0 ? (
							<div className="px-6 py-12 text-center">
								<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									No matches found
								</h3>
								<p className="text-gray-500">
									Try adjusting your search or filters
								</p>
							</div>
						) : (
							filteredUsers.map((user) => (
								<UserCard
									key={user.id}
									user={user}
									isApplied={appliedUsers.includes(user.id)}
									onApply={() => handleApply(user.id)}
								/>
							))
						)}
					</div>
				</div>
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
	return (
		<div className="px-6 py-4 hover:bg-gray-50 transition-colors">
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center space-x-3">
						<h3 className="text-lg font-semibold text-gray-900">
							{user.publicTitle}
						</h3>
						<span className="text-sm text-gray-500">
							{user.term} • {user.major}
						</span>
					</div>

					{user.tags.length > 0 && (
						<div className="mt-2 flex flex-wrap gap-1">
							{user.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>

				<div className="ml-4">
					<button
						onClick={onApply}
						disabled={isApplied}
						className={`px-4 py-2 rounded-lg font-medium transition-colors ${
							isApplied
								? "bg-green-100 text-green-800 cursor-not-allowed"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						{isApplied ? "Applied ✓" : "Apply"}
					</button>
				</div>
			</div>
		</div>
	);
}
