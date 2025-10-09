import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tagsParam = searchParams.get("tags");
    const searchTerm = searchParams.get("search");

    // Parse tags from comma-separated string
    const selectedTags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

    // Build the where clause for filtering
    const whereClause: any = {
      active_in_cycle: true, // Only show active users
    };

    // Add tag filtering if tags are selected
    if (selectedTags.length > 0) {
      whereClause.tags = {
        some: {
          value: {
            in: selectedTags,
          },
        },
      };
    }

    // Add search term filtering if provided
    if (searchTerm) {
      whereClause.OR = [
        {
          firstName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          program: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          bio: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          tags: {
            some: {
              value: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    // Fetch users from database with tags included
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        tags: true, // Include the related tags
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return the users
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
