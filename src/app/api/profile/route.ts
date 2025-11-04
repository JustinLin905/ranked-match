import { NextResponse } from "next/server";
import { PrismaClient, Term } from "../../../../generated/prisma";
import { getCurrentUser } from "@/lib/auth";

const prisma = new PrismaClient();

// GET: Fetch current user's profile
export async function GET() {
  try {
    // Check authentication
    const currentUserEmail = await getCurrentUser();
    if (!currentUserEmail) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Fetch user profile with tags
    const user = await prisma.user.findUnique({
      where: { email: currentUserEmail },
      include: { tags: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return profile data
    return NextResponse.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      program: user.program,
      bio: user.bio,
      highlights: user.highlights,
      tags: user.tags.map((tag) => tag.value),
      term: user.term,
      sequence: user.sequence,
      instagram: user.instagram,
      discord: user.discord,
      phone: user.phone,
      active_in_cycle: user.active_in_cycle,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// POST: Create or update user profile
export async function POST(request: Request) {
  try {
    // Check authentication
    const currentUserEmail = await getCurrentUser();
    if (!currentUserEmail) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      firstName,
      lastName,
      program,
      bio,
      highlights,
      tags,
      term,
      sequence,
      instagram,
      discord,
      phone,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !program || !bio || !term) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!highlights || highlights.length === 0) {
      return NextResponse.json(
        { error: "At least one highlight is required" },
        { status: 400 }
      );
    }

    if (!tags || tags.length === 0) {
      return NextResponse.json(
        { error: "At least one tag is required" },
        { status: 400 }
      );
    }

    // Validate that all tags exist in the database
    const existingTags = await prisma.tag.findMany({
      where: { value: { in: tags } },
    });

    if (existingTags.length !== tags.length) {
      return NextResponse.json(
        { error: "Some tags do not exist. Please select from available tags." },
        { status: 400 }
      );
    }

    // Validate term is a valid enum value
    const validTerms = [
      "TERM_1A",
      "TERM_1B",
      "TERM_2A",
      "TERM_2B",
      "TERM_3A",
      "TERM_3B",
      "TERM_4A",
      "TERM_4B",
      "TERM_5A",
      "TERM_5B",
    ];
    if (!validTerms.includes(term)) {
      return NextResponse.json({ error: "Invalid term" }, { status: 400 });
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: currentUserEmail },
      data: {
        firstName,
        lastName,
        program,
        bio,
        highlights,
        term: term as Term,
        sequence,
        instagram: instagram || null,
        discord: discord || null,
        phone: phone || null,
        tags: {
          set: [], // Clear existing tags first
          connect: tags.map((tag: string) => ({ value: tag })),
        },
      },
      include: { tags: true },
    });

    // Return updated profile
    return NextResponse.json({
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      program: updatedUser.program,
      bio: updatedUser.bio,
      highlights: updatedUser.highlights,
      tags: updatedUser.tags.map((tag) => tag.value),
      term: updatedUser.term,
      sequence: updatedUser.sequence,
      instagram: updatedUser.instagram,
      discord: updatedUser.discord,
      phone: updatedUser.phone,
      active_in_cycle: updatedUser.active_in_cycle,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

