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
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
								<Users className="h-6 w-6 text-primary-foreground" />
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
							<Link href="/login">
								<Button variant="ghost" size="sm">
									Log In
								</Button>
							</Link>
							<Link href="/postings">
								<Button size="sm" className="rounded-full">
									Get Started
								</Button>
							</Link>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
				{/* Decorative blob shapes with images */}
				<div className="absolute top-20 right-[10%] w-64 h-64 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary/10 blur-3xl" />
				<div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-secondary/20 blur-3xl" />
				<div className="absolute top-1/2 right-[20%] w-48 h-48 rounded-full bg-accent/15 blur-2xl" />

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="mx-auto max-w-4xl text-center">
						<div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-medium border-2 border-secondary/50 shadow-lg">
							<Sparkles className="h-4 w-4 text-primary" />
							<span>Find your people, build your community</span>
						</div>
						<h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-balance mb-8 leading-[1.1]">
							The best place to{" "}
							<span className="italic text-primary">connect</span> and{" "}
							<span className="italic text-secondary-foreground bg-secondary px-4 py-1 rounded-2xl inline-block">
								match
							</span>{" "}
							with students
						</h1>
						<p className="text-xl sm:text-2xl text-muted-foreground text-pretty mb-12 max-w-2xl mx-auto leading-relaxed">
							Join intramurals, start clubs, or find study partners through our
							smart matching system. No more awkward posters or endless group
							chats.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="text-lg px-10 py-7 rounded-full shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all hover:scale-105"
							>
								Get Started
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-10 py-7 rounded-full bg-card border-2 hover:bg-secondary/50 transition-all"
							>
								Learn More
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section
				id="how-it-works"
				className="py-20 sm:py-32 bg-secondary/20 relative overflow-hidden"
			>
				{/* Decorative blobs */}
				<div className="absolute top-20 left-0 w-64 h-64 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary/10 blur-3xl" />
				<div className="absolute bottom-20 right-0 w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-accent/20 blur-3xl" />

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="text-center mb-16">
						<h2 className="text-5xl sm:text-6xl font-bold mb-6 text-balance">
							How It <span className="italic text-primary">Works</span>
						</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Our three-phase matching system makes finding your people simple
							and fair
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						<Card className="border-4 rounded-[2.5rem] overflow-hidden bg-card shadow-2xl hover:shadow-primary/20 transition-all hover:-translate-y-2">
							<CardContent className="pt-10 pb-10 px-8">
								<div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/10 mb-6 border-4 border-primary/20 shadow-lg">
									<Users className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-2xl font-bold mb-4">
									1. Create Your Profile
								</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									Build an anonymous profile with your interests, availability,
									and what you're looking for. Choose a creative public handle
									to stay anonymous.
								</p>
							</CardContent>
						</Card>

						<Card className="border-4 rounded-[2.5rem] overflow-hidden bg-card shadow-2xl hover:shadow-secondary/20 transition-all hover:-translate-y-2">
							<CardContent className="pt-10 pb-10 px-8">
								<div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-secondary/50 mb-6 border-4 border-secondary shadow-lg">
									<Calendar className="h-8 w-8 text-secondary-foreground" />
								</div>
								<h3 className="text-2xl font-bold mb-4">2. Browse & Apply</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
									During the 1-2 week application period, browse the General
									Board and apply to profiles that match your interests. Review
									who applied to you.
								</p>
							</CardContent>
						</Card>

						<Card className="border-4 rounded-[2.5rem] overflow-hidden bg-card shadow-2xl hover:shadow-accent/20 transition-all hover:-translate-y-2">
							<CardContent className="pt-10 pb-10 px-8">
								<div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-accent/30 mb-6 border-4 border-accent shadow-lg">
									<Sparkles className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-2xl font-bold mb-4">3. Get Matched</h3>
								<p className="text-muted-foreground leading-relaxed text-lg">
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
			<section
				id="features"
				className="py-20 sm:py-32 relative overflow-hidden"
			>
				{/* Large decorative blobs */}
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
						<div>
							<h2 className="text-5xl sm:text-6xl font-bold mb-8 text-balance leading-tight">
								Why students <span className="italic text-primary">love</span>{" "}
								RankedMatch
							</h2>
							<p className="text-xl text-muted-foreground mb-10 leading-relaxed">
								We've designed a system that removes the awkwardness from making
								friends and joining activities on campus.
							</p>

							<div className="space-y-8">
								<div className="flex gap-5">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
											<CheckCircle2 className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<h3 className="font-bold text-xl mb-2">
											Anonymous Until Matched
										</h3>
										<p className="text-muted-foreground leading-relaxed text-lg">
											Stay anonymous with your public handle until you're
											matched. No pressure, no judgment.
										</p>
									</div>
								</div>

								<div className="flex gap-5">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/30 border-2 border-accent">
											<CheckCircle2 className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<h3 className="font-bold text-xl mb-2">
											Smart Group Formation
										</h3>
										<p className="text-muted-foreground leading-relaxed text-lg">
											Our algorithm creates optimal friend groups based on
											shared interests and compatibility.
										</p>
									</div>
								</div>

								<div className="flex gap-5">
									<div className="flex-shrink-0">
										<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
											<CheckCircle2 className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div>
										<h3 className="font-bold text-xl mb-2">
											Structured Cycles
										</h3>
										<p className="text-muted-foreground leading-relaxed text-lg">
											Clear application and matching periods mean everyone knows
											when to participate.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="relative">
							{/* Decorative background blobs */}
							<div className="absolute -top-8 -right-8 w-40 h-40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-primary/10 blur-2xl" />
							<div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-secondary/20 blur-2xl" />

							<Card className="border-4 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/10 shadow-2xl relative overflow-hidden">
								<CardContent className="p-10 relative z-10">
									<div className="space-y-6">
										<div className="flex items-center gap-5 p-5 bg-card rounded-[1.5rem] border-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
											<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20">
												<Users className="h-8 w-8 text-primary" />
											</div>
											<div>
												<div className="font-bold text-lg">Volleyball Pro</div>
												<div className="text-sm text-muted-foreground">
													Looking for Tuesday 8pm team
												</div>
											</div>
										</div>

										<div className="flex items-center gap-5 p-5 bg-card rounded-[1.5rem] border-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
											<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20">
												<Sparkles className="h-8 w-8 text-primary" />
											</div>
											<div>
												<div className="font-bold text-lg">
													Design Enthusiast
												</div>
												<div className="text-sm text-muted-foreground">
													Starting a UI/UX club
												</div>
											</div>
										</div>

										<div className="flex items-center gap-5 p-5 bg-card rounded-[1.5rem] border-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
											<div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/30 border-4 border-accent">
												<Calendar className="h-8 w-8 text-primary" />
											</div>
											<div>
												<div className="font-bold text-lg">Study Buddy</div>
												<div className="text-sm text-muted-foreground">
													CS major seeking study group
												</div>
											</div>
										</div>

										<div className="text-center pt-6">
											<p className="text-base font-bold text-foreground">
												Join hundreds of students finding their{" "}
												<span className="italic text-primary">community</span>
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
			<section className="py-24 sm:py-32 bg-primary text-primary-foreground relative overflow-hidden">
				{/* Large decorative blobs */}
				<div className="absolute top-0 right-[10%] w-96 h-96 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-secondary/20 blur-3xl" />
				<div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-accent/20 blur-3xl" />

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
							Ready to find your <span className="italic">people</span>?
						</h2>
						<p className="text-xl sm:text-2xl mb-12 opacity-90 leading-relaxed max-w-2xl mx-auto">
							Join the next matching cycle and connect with students who share
							your interests. No more missed connections or awkward
							introductions.
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center">
							<Button
								size="lg"
								variant="secondary"
								className="text-lg px-12 py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
							>
								Create Your Profile
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-12 py-7 rounded-full bg-transparent border-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all"
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
							<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
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
