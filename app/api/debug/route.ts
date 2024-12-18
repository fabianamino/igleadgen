import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Get all users with their social fields
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        location: true,
        website: true,
        instagram: true,
        twitter: true,
        linkedin: true,
        github: true,
        youtube: true,
        facebook: true,
        discord: true,
        tiktok: true,
        image: true,
        emailVerified: true,
        role: true,
        isTwoFactorEnabled: true
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
