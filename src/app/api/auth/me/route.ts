import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
	try {
		const currentUserEmail = await getCurrentUser();

		if (!currentUserEmail) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		return NextResponse.json({
			email: currentUserEmail,
			isAuthenticated: true,
		});
	} catch (error) {
		console.error("Error getting current user:", error);
		return NextResponse.json(
			{ error: "Authentication error" },
			{ status: 500 }
		);
	}
}
