import { Metadata } from "next";
import { getProfileByUsername } from "../actions/profile";
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
