import db from "@/lib/db";

export const generateUsername = async (firstName: string, lastName: string): Promise<string> => {
  // Combine first and last name, remove special characters and convert to lowercase
  const baseUsername = `${firstName}${lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  // Try the base username first
  let username = baseUsername;
  let counter = 1;

  while (true) {
    const existingUser = await db.user.findUnique({
      where: { username }
    });

    if (!existingUser) {
      return username;
    }

    // If username exists, append a number and try again
    username = `${baseUsername}${counter}`;
    counter++;

    // Safety check to prevent infinite loops
    if (counter > 1000) {
      throw new Error("Unable to generate a unique username");
    }
  }
};
