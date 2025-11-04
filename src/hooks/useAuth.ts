"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: string | null;
}

export function useAuth() {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		isLoading: true,
		user: null,
	});
	const router = useRouter();

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch("/api/auth/me");

			if (response.ok) {
				const data = await response.json();
				setAuthState({
					isAuthenticated: true,
					isLoading: false,
					user: data.email,
				});
			} else {
				setAuthState({
					isAuthenticated: false,
					isLoading: false,
					user: null,
				});
			}
		} catch (error) {
			console.error("Error checking auth status:", error);
			setAuthState({
				isAuthenticated: false,
				isLoading: false,
				user: null,
			});
		}
	};

	const logout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setAuthState({
				isAuthenticated: false,
				isLoading: false,
				user: null,
			});
			router.push("/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return {
		...authState,
		logout,
		checkAuthStatus,
	};
}

export function useRequireAuth() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, isLoading, router]);

	return { isAuthenticated, isLoading };
}
