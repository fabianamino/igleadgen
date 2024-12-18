import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Set the username for the current user
    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        username: "fabianamino"
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USERNAME_SET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
