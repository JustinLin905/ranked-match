import { NextRequest, NextResponse } from "next/server";
import {
  createLoginToken,
  sendMagicLinkEmail,
  getOrCreateUser,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create user if doesn't exist
    await getOrCreateUser(email);

    // Create login token
    const token = await createLoginToken(email);

    // Send magic link email
    await sendMagicLinkEmail(email, token);

    return NextResponse.json({
      success: true,
      message: "Magic link sent to your email",
    });
  } catch (error) {
    console.error("Error requesting login:", error);
    return NextResponse.json(
      { error: "Failed to send magic link" },
      { status: 500 }
    );
  }
}
