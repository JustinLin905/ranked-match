"use client";
import { Heart, Users, Clock, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { UserProfile } from "@/types";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [appliedUsers, setAppliedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tag Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Filter by Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
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
                Available Matches ({users.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>Applied to {appliedUsers.length} users</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="px-6 py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
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
        </div>
      </div>
    </div>
  );
}

			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 sm:py-32">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
							<Sparkles className="h-4 w-4 text-primary" />
							<span>Find your people, build your community</span>
						</div>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
							Connect with students who share your{" "}
							<span className="text-primary">interests</span>
						</h1>
						<p className="text-xl text-muted-foreground text-pretty mb-10 max-w-2xl mx-auto leading-relaxed">
							Join intramurals, start clubs, or find study partners through our
							smart matching system. No more awkward posters or endless group
							chats.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" className="text-base px-8">
								Start Matching
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-base px-8 bg-transparent"
							>
								Learn More
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section id="how-it-works" className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">
							How It Works
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Our three-phase matching system makes finding your people simple
							and fair
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<Card className="border-2">
							<CardContent className="pt-8 pb-8">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
									<Users className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-3">
									1. Create Your Profile
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									Build an anonymous profile with your interests, availability,
									and what you're looking for. Choose a creative public handle
									to stay anonymous.
								</p>
							</CardContent>
						</Card>

						<Card className="border-2">
							<CardContent className="pt-8 pb-8">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
									<Calendar className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-3">2. Browse & Apply</h3>
								<p className="text-muted-foreground leading-relaxed">
									During the 1-2 week application period, browse the General
									Board and apply to profiles that match your interests. Review
									who applied to you.
								</p>
							</CardContent>
						</Card>

						<Card className="border-2">
							<CardContent className="pt-8 pb-8">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
									<Sparkles className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-xl font-bold mb-3">3. Get Matched</h3>
								<p className="text-muted-foreground leading-relaxed">
									Our algorithm analyzes mutual interests and creates optimized
									friend groups. Connect with your matches and start building
									your community!
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
								Why students love RankedMatch
							</h2>
							<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
								We've designed a system that removes the awkwardness from making
								friends and joining activities on campus.
							</p>

							<div className="space-y-6">
								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<CheckCircle2 className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">
											Anonymous Until Matched
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											Stay anonymous with your public handle until you're
											matched. No pressure, no judgment.
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<CheckCircle2 className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">
											Fair Two-Sided Matching
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											Everyone is equal. Whether you're posting or applying, the
											algorithm treats you the same.
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<CheckCircle2 className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">
											Smart Group Formation
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											Our algorithm creates optimal friend groups based on
											shared interests and compatibility.
										</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="flex-shrink-0">
										<CheckCircle2 className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">Structured Cycles</h3>
										<p className="text-muted-foreground leading-relaxed">
											Clear application and matching periods mean everyone knows
											when to participate.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative">
							<Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
								<CardContent className="p-8">
									<div className="space-y-6">
										<div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
											<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
												<Users className="h-6 w-6 text-primary" />
											</div>
											<div>
												<div className="font-semibold">Volleyball Pro</div>
												<div className="text-sm text-muted-foreground">
													Looking for Tuesday 8pm team
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
											<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
												<Sparkles className="h-6 w-6 text-primary" />
											</div>
											<div>
												<div className="font-semibold">Design Enthusiast</div>
												<div className="text-sm text-muted-foreground">
													Starting a UI/UX club
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
											<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
												<Calendar className="h-6 w-6 text-primary" />
											</div>
											<div>
												<div className="font-semibold">Study Buddy</div>
												<div className="text-sm text-muted-foreground">
													CS major seeking study group
												</div>
											</div>
										</div>

										<div className="text-center pt-4">
											<p className="text-sm font-medium text-muted-foreground">
												Join hundreds of students finding their community
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
							Ready to find your people?
						</h2>
						<p className="text-lg mb-8 opacity-90 leading-relaxed">
							Join the next matching cycle and connect with students who share
							your interests. No more missed connections or awkward
							introductions.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" className="text-base px-8">
								Create Your Profile
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-base px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
							>
								View Demo
							</Button>
						</div>
					</div>
				</div>
			</section>

function UserCard({ user, isApplied, onApply }: UserCardProps) {
  // Format term to display (convert TERM_1A to 1A)
  const displayTerm = user.term.replace("TERM_", "");

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <span className="text-sm text-gray-500">
              {displayTerm} • {user.program}
            </span>
          </div>

          {user.bio && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {user.bio}
            </p>
          )}

          {user.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {user.tags.map((tag) => (
                <span
                  key={tag.value}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag.value}
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
