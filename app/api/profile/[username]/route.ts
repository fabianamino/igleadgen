import { NextResponse } from "next/server";
import { getProfileByUsername } from "@/actions/profile";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const profile = await getProfileByUsername(params.username);
    
    if (!profile) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(profile, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse(null, { status: 500 });
  }
}
