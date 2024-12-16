import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db"; // updated named import for db

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, mediaCount, avgLikes, avgComments } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const hashtag = await prisma.hashtag.create({ // updated db to prisma
      data: {
        name,
        postsCount: mediaCount || 0,
        avgLikes: avgLikes || 0,
        avgComments: avgComments || 0,
        userId: session.user.id,
      },
    });

    return NextResponse.json(hashtag);
  } catch (error) {
    console.error("[HASHTAGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hashtags = await prisma.hashtag.findMany({ // updated db to prisma
      where: {
        userId: session.user.id,
      },
      orderBy: {
        searchedAt: "desc",
      },
    });

    return NextResponse.json(hashtags);
  } catch (error) {
    console.error("[HASHTAGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
