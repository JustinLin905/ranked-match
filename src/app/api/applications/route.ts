import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { getCurrentUser } from "@/lib/auth";

const prisma = new PrismaClient();

// GET: Fetch users that have been applied to
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const currentUserEmail = await getCurrentUser();
    if (!currentUserEmail) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const appliedEmailsParam = searchParams.get("emails");

    if (!appliedEmailsParam) {
      return NextResponse.json([]);
    }

    // Parse emails from comma-separated string
    const appliedEmails = appliedEmailsParam.split(",").filter(Boolean);

    if (appliedEmails.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch users that match the applied emails
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: appliedEmails,
        },
        active_in_cycle: true,
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching applied users:", error);
    return NextResponse.json(
      { error: "Failed to fetch applied users" },
      { status: 500 }
    );
  }
}
