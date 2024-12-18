"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadButton } from "@/components/upload-button";
import { toast } from "sonner";
import { Loader2, Link as LinkIcon, Copy, Twitter, Linkedin, Youtube, Facebook, MessageCircle, Music2, MapPin, Globe, Instagram, Github } from "lucide-react";
import { getCurrentUser } from "@/actions/user";
import { getProfileByUsername, ProfileData, ProfileUpdateInput, updateProfile } from "@/app/actions/profile";
import { uploadProfileImage } from "@/app/actions/upload";

function generateUsername(firstName: string, lastName: string) {
  return `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replace(/[^a-z0-9]/g, '');
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<ProfileData | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [formData, setFormData] = useState<ProfileUpdateInput>({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    facebook: "",
    discord: "",
    tiktok: "",
    username: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser?.email) {
          const profileData = await getProfileByUsername(currentUser.email);
          if (profileData) {
            setUser(profileData);
            setFormData({
              firstName: profileData.firstName || "",
              lastName: profileData.lastName || "",
              bio: profileData.bio || "",
              location: profileData.location || "",
              website: profileData.website || "",
              instagram: profileData.instagram || "",
              twitter: profileData.twitter || "",
              linkedin: profileData.linkedin || "",
              github: profileData.github || "",
              youtube: profileData.youtube || "",
              facebook: profileData.facebook || "",
              discord: profileData.discord || "",
              tiktok: profileData.tiktok || "",
              username: profileData.username || generateUsername(profileData.firstName || "", profileData.lastName || ""),
            });
            const shareUsername = profileData.username || 
              `${profileData.firstName?.toLowerCase?.() || ''}${profileData.lastName?.toLowerCase?.() || ''}`.replace(/[^a-z0-9]/g, '') || 
              'profile';
            setShareUrl(`app.igleadgen.com/${shareUsername}`);
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
        toast.error("Failed to load user data");
      }
    };

    loadUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadProfileImage(formData);
      const updatedUser = await updateProfile({ image: response.url });
      setUser(updatedUser);
      toast.success("Profile image updated");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share URL copied to clipboard");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Profile Header Card */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your profile information and social media presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
            <Avatar className="h-24 w-24 ring-2 ring-primary/10">
              <AvatarImage src={user.image || undefined} className="object-cover" />
              <AvatarFallback className="text-lg bg-primary/5">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-medium">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo to personalize your profile
              </p>
              <UploadButton
                onUpload={handleImageUpload}
                loading={isLoading}
              />
            </div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-center text-white">Edit Profile</h2>
              <p className="text-gray-400 text-center">
                Customize your profile and connect your social media accounts
              </p>
            </div>

            {/* Share URL Section */}
            <div className="space-y-3 bg-white/5 p-6 rounded-lg border border-white/10">
              <Label className="text-lg font-semibold text-white flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Share Your Profile
              </Label>
              <div className="flex gap-2">
                <Input 
                  value={shareUrl} 
                  readOnly 
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyShareUrl}
                  className="shrink-0 bg-white/5 hover:bg-white/10 border-white/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white">Basic Information</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    placeholder="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-300">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-300">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-300">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website || ''}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Social Links
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Instagram className="h-4 w-4" /> Instagram
                    </Label>
                    <Input
                      name="instagram"
                      value={formData.instagram || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Twitter className="h-4 w-4" /> Twitter
                    </Label>
                    <Input
                      name="twitter"
                      value={formData.twitter || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </Label>
                    <Input
                      name="linkedin"
                      value={formData.linkedin || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="Profile URL or username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </Label>
                    <Input
                      name="github"
                      value={formData.github || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Youtube className="h-4 w-4" /> YouTube
                    </Label>
                    <Input
                      name="youtube"
                      value={formData.youtube || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="Channel URL or @handle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Facebook className="h-4 w-4" /> Facebook
                    </Label>
                    <Input
                      name="facebook"
                      value={formData.facebook || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="Profile URL or username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> Discord
                    </Label>
                    <Input
                      name="discord"
                      value={formData.discord || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="Server invite or username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <Music2 className="h-4 w-4" /> TikTok
                    </Label>
                    <Input
                      name="tiktok"
                      value={formData.tiktok || ''}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-black font-medium py-2.5"
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
