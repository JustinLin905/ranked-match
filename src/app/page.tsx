import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Users,
	Calendar,
	Sparkles,
	ArrowRight,
	CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
								<Users className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold">RankedMatch</span>
						</div>
						<nav className="hidden md:flex items-center gap-6">
							<a
								href="#how-it-works"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								How It Works
							</a>
							<a
								href="#features"
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Features
							</a>
							<Button variant="ghost" size="sm">
								Log In
							</Button>
							<Link href="/postings">
								<Button size="sm">Get Started</Button>
							</Link>
						</nav>
					</div>
				</div>
			</header>

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

			{/* Footer */}
			<footer className="border-t border-border py-12">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
								<Users className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="text-xl font-bold">RankedMatch</span>
						</div>
						<div className="flex gap-6 text-sm text-muted-foreground">
							<a href="#" className="hover:text-foreground transition-colors">
								About
							</a>
							<a href="#" className="hover:text-foreground transition-colors">
								Privacy
							</a>
							<a href="#" className="hover:text-foreground transition-colors">
								Terms
							</a>
							<a href="#" className="hover:text-foreground transition-colors">
								Contact
							</a>
						</div>
					</div>
					<div className="mt-8 text-center text-sm text-muted-foreground">
						© 2025 RankedMatch. Building stronger campus communities.
					</div>
				</div>
			</footer>
		</div>
	);
}
