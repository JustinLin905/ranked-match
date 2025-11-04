"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useRequireAuth();

	if (isLoading) {
		return (
			fallback || (
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			)
		);
	}

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="text-muted-foreground mb-4">Redirecting to login...</p>
					<Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
