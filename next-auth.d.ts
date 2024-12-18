import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { AdapterUser } from "@auth/core/adapters";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface User extends AdapterUser {
    firstName?: string | null;
    lastName?: string | null;
    role: UserRole;
    emailVerified?: Date | null;
    isTwoFactorEnabled: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName?: string | null;
    lastName?: string | null;
    role: UserRole;
    emailVerified?: Date | null;
    isTwoFactorEnabled: boolean;
  }
}
