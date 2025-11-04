import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { PrismaClient } from "../../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const email = await getCurrentUser();

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email },
      include: { tags: true },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
}
