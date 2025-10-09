import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all unique tags from the database
    const tags = await prisma.tag.findMany({
      orderBy: {
        value: "asc",
      },
    });

    // Return just the tag values as an array of strings
    return NextResponse.json(tags.map((tag) => tag.value));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
