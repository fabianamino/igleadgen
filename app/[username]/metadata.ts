import { Metadata } from "next";
import { getProfileByUsername } from "../actions/profile";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const profile = await getProfileByUsername(params.username);
  
  if (!profile) {
    return {
      title: "Profile Not Found | ShareALead",
      description: "This profile could not be found on ShareALead.",
    };
  }

  return {
    title: `${profile.firstName || profile.username} | ShareALead`,
    description: profile.bio || `View ${profile.firstName || profile.username}'s profile on ShareALead`,
    openGraph: {
      images: [{ url: profile.image || "/default-avatar.png" }],
    },
  };
}

// Enable static page generation at build time
export async function generateStaticParams() {
  // You can add logic here to pre-generate popular profiles
  return [];
}

// Enable static page generation with dynamic params
export const dynamicParams = true;
