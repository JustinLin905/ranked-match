import { NextRequest, NextResponse } from "next/server";
import { verifyToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify token
    const result = await verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Invalid token" },
        { status: 401 }
      );
    }

    // Set session cookie
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      email: result.email,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 500 }
    );
  }
}
