"use server";

import db from "@/lib/db";
import { getCurrentUser } from "@/actions/user";
import { Prisma, User, UserRole } from "@prisma/client";

// Define all fields we want to select from the user
const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  emailVerified: true,
  image: true,
  password: true,
  role: true,
  isTwoFactorEnabled: true,
  username: true,
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
  tiktok: true
} as const;

// Get the type that Prisma will return with our select
type UserSelect = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

// Export this type for use in other files
export type ProfileData = UserSelect;

export type ProfileUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  discord?: string | null;
  tiktok?: string | null;
  username?: string | null;
};

function generateUsername(firstName: string, lastName: string): string {
  // Remove spaces and special characters, convert to lowercase
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Combine first and last name
  return `${cleanFirst}${cleanLast}`;
}

export async function getProfileByUsername(usernameOrEmail: string): Promise<ProfileData | null> {
  try {
    // First try to find by username or email
    let user = await db.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      },
      select: userSelect
    });

    // If not found and the input looks like a name, try finding by name
    if (!user && usernameOrEmail.includes(' ')) {
      const [firstName, lastName] = usernameOrEmail.split(' ');
      user = await db.user.findFirst({
        where: {
          firstName,
          lastName
        },
        select: userSelect
      });
    }

    if (!user) {
      return null;
    }

    // If user found but no username set, update it
    if (user && !user.username) {
      const username = generateUsername(user.firstName || '', user.lastName || '');
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { username },
        select: userSelect
      });
      return updatedUser;
    }

    return user;
  } catch (error) {
    console.error('Error in getProfileByUsername:', error);
    return null;
  }
}

export async function updateProfile(data: ProfileUpdateInput): Promise<ProfileData> {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error("Not authenticated");
  }

  // If username is being updated, ensure it's unique
  if (data.username) {
    const existingUser = await db.user.findFirst({
      where: {
        username: data.username,
        id: {
          not: currentUser.id
        }
      },
      select: userSelect
    });

    if (existingUser) {
      throw new Error("Username already taken");
    }
  }

  // Update the user with the filtered data
  const updatedUser = await db.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.image !== undefined && { image: data.image }),
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.location !== undefined && { location: data.location }),
      ...(data.website !== undefined && { website: data.website }),
      ...(data.instagram !== undefined && { instagram: data.instagram }),
      ...(data.twitter !== undefined && { twitter: data.twitter }),
      ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
      ...(data.github !== undefined && { github: data.github }),
      ...(data.youtube !== undefined && { youtube: data.youtube }),
      ...(data.facebook !== undefined && { facebook: data.facebook }),
      ...(data.discord !== undefined && { discord: data.discord }),
      ...(data.tiktok !== undefined && { tiktok: data.tiktok }),
      ...(data.username !== undefined && { username: data.username })
    },
    select: userSelect
  });

  return updatedUser;
}
