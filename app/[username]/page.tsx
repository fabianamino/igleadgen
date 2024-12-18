import { getProfileByUsername, ProfileData } from "@/app/actions/profile";
import { getCurrentUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Twitter, Linkedin, Github, Instagram, Youtube, Facebook, MessageCircle, Music2, Globe, MapPin } from "lucide-react";
import { ShareButton } from "./share-button";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const profile = await getProfileByUsername(params.username) as ProfileData;
  
  if (!profile) {
    return {
      title: "Profile Not Found",
      description: "The requested profile could not be found.",
    };
  }

  return {
    title: `${profile.firstName} ${profile.lastName} - Profile`,
    description: profile.bio || `Check out ${profile.firstName}'s profile`,
    openGraph: {
      images: profile.image ? [profile.image] : [],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  if (!params?.username) {
    console.log('No username provided in params');
    notFound();
  }

  // Validate username format or check if it's a full name
  if (!params.username.includes(' ') && !params.username.match(/^[a-zA-Z0-9_-]+$/)) {
    console.log('Invalid username format:', params.username);
    notFound();
  }

  try {
    const profile = await getProfileByUsername(params.username);

    if (!profile) {
      console.log('Profile not found for username:', params.username);
      notFound();
    }

    // If we have a username, redirect to it
    if (profile.username && profile.username !== params.username) {
      return redirect(`/${profile.username}`);
    }

    // Get current user for comparison
    const currentUser = await getCurrentUser();
    const isOwnProfile = currentUser?.email === profile.email;

    console.log('Profile access:', {
      isOwnProfile,
      currentUserEmail: currentUser?.email,
      profileEmail: profile.email
    });

    const formatSocialUrl = (type: string, username: string | null): string | undefined => {
      if (!username) return undefined;
      
      // Remove @ symbol if present
      const cleanUsername = username.replace(/^@/, '');
      
      let formattedUrl;
      switch (type) {
        case 'twitter':
          formattedUrl = `https://twitter.com/${cleanUsername}`;
          break;
        case 'linkedin':
          formattedUrl = username.includes('linkedin.com') ? username : `https://linkedin.com/in/${cleanUsername}`;
          break;
        case 'github':
          formattedUrl = `https://github.com/${cleanUsername}`;
          break;
        case 'instagram':
          formattedUrl = `https://instagram.com/${cleanUsername}`;
          break;
        case 'youtube':
          formattedUrl = username.includes('youtube.com') ? username : `https://youtube.com/@${cleanUsername}`;
          break;
        case 'facebook':
          formattedUrl = username.includes('facebook.com') ? username : `https://facebook.com/${cleanUsername}`;
          break;
        case 'tiktok':
          formattedUrl = username.includes('tiktok.com') ? username : `https://tiktok.com/@${cleanUsername}`;
          break;
        case 'discord':
          formattedUrl = username.includes('discord.gg') ? username : username;
          break;
        case 'website':
          // Handle website URL formatting
          if (!username.startsWith('http://') && !username.startsWith('https://')) {
            formattedUrl = `https://${username}`;
          } else {
            formattedUrl = username;
          }
          break;
        default:
          formattedUrl = username;
      }
      return formattedUrl;
    };

    // Define the type for social link items
    type SocialLinkItem = {
      icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
      link: string;
      label: string;
      color: string;
      bgColor: string;
    };

    // Create social links array only for links that exist
    const socialLinks: SocialLinkItem[] = [];

    if (profile.twitter) {
      const link = formatSocialUrl('twitter', profile.twitter);
      if (link) socialLinks.push({ icon: Twitter, link, label: "Twitter", color: "#1DA1F2", bgColor: "rgba(29, 161, 242, 0.1)" });
    }

    if (profile.linkedin) {
      const link = formatSocialUrl('linkedin', profile.linkedin);
      if (link) socialLinks.push({ icon: Linkedin, link, label: "LinkedIn", color: "#0A66C2", bgColor: "rgba(10, 102, 194, 0.1)" });
    }

    if (profile.github) {
      const link = formatSocialUrl('github', profile.github);
      if (link) socialLinks.push({ icon: Github, link, label: "GitHub", color: "#333", bgColor: "rgba(51, 51, 51, 0.1)" });
    }

    if (profile.instagram) {
      const link = formatSocialUrl('instagram', profile.instagram);
      if (link) socialLinks.push({ icon: Instagram, link, label: "Instagram", color: "#E4405F", bgColor: "rgba(228, 64, 95, 0.1)" });
    }

    if (profile.youtube) {
      const link = formatSocialUrl('youtube', profile.youtube);
      if (link) socialLinks.push({ icon: Youtube, link, label: "YouTube", color: "#FF0000", bgColor: "rgba(255, 0, 0, 0.1)" });
    }

    if (profile.facebook) {
      const link = formatSocialUrl('facebook', profile.facebook);
      if (link) socialLinks.push({ icon: Facebook, link, label: "Facebook", color: "#1877F2", bgColor: "rgba(24, 119, 242, 0.1)" });
    }

    if (profile.discord) {
      const link = formatSocialUrl('discord', profile.discord);
      if (link) socialLinks.push({ icon: MessageCircle, link, label: "Discord", color: "#5865F2", bgColor: "rgba(88, 101, 242, 0.1)" });
    }

    if (profile.tiktok) {
      const link = formatSocialUrl('tiktok', profile.tiktok);
      if (link) socialLinks.push({ icon: Music2, link, label: "TikTok", color: "#000000", bgColor: "rgba(0, 0, 0, 0.1)" });
    }

    if (profile.website) {
      const link = formatSocialUrl('website', profile.website);
      if (link) {
        socialLinks.push({ icon: Globe, link, label: "Website", color: "#f46ee9", bgColor: "rgba(14, 165, 233, 0.1)" });
      }
    }


    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.image || undefined} alt={profile.firstName || ''} sizes="128px" />
              <AvatarFallback>{profile.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
              {profile.bio && <p className="text-gray-400">{profile.bio}</p>}
            </div>
          </div>

          {/* Location and Website */}
          {(profile.location || profile.website) && (
            <div className="flex justify-center space-x-6">
              {profile.location && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && formatSocialUrl('website', profile.website) && (
                <a 
                  href={formatSocialUrl('website', profile.website)!} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>
          )}

          {/* Social Links */}
          <div className="space-y-4">
            {socialLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialLinks.map(({ icon: Icon, link, label, color, bgColor }) => (
                  <a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full transform transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div 
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 border border-white/10"
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon style={{ color }} className="w-5 h-5" />
                        <span className="text-white font-medium">{label}</span>
                      </div>
                      <div className="text-gray-400">
                        <span className="text-sm">@{link.split('/').pop()}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="space-y-3">
                  <h3 className="text-gray-400">No social links added yet</h3>
                  {isOwnProfile && (
                    <a
                      href="/profile"
                      className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                      Add Social Links
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Share Button */}
          <div className="pt-6 text-center">
            <ShareButton title={params.username} />
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error('Error in ProfilePage:', error);
    notFound();
  }
}