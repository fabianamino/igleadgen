"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Star,
  Trophy,
  Users,
  Sparkles,
  Camera,
  Link,
  MapPin,
  Calendar,
  MessageCircle,
  Share2,
  Bookmark,
  BadgeCheck,
} from "lucide-react";

const achievements = [
  {
    title: "Early Adopter",
    description: "Joined in the first month",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    progress: 100,
  },
  {
    title: "Trendsetter",
    description: "Created 5 viral posts",
    icon: Sparkles,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    progress: 80,
  },
  {
    title: "Influencer",
    description: "Reached 10k followers",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    progress: 60,
  },
  {
    title: "Content Creator",
    description: "Posted 100 times",
    icon: Trophy,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    progress: 45,
  },
];

const stats = [
  { label: "Posts", value: "1.2K" },
  { label: "Followers", value: "8.6K" },
  { label: "Following", value: "1.1K" },
  { label: "Likes", value: "15.7K" },
];

const recentPosts = [
  {
    id: 1,
    content: "Just launched my new social media strategy course! 🚀",
    likes: "1.2K",
    comments: "234",
    saved: "89",
  },
  {
    id: 2,
    content: "Here's how I grew my Instagram following to 10K in 3 months 📈",
    likes: "956",
    comments: "167",
    saved: "145",
  },
  {
    id: 3,
    content: "5 tips for creating engaging content that converts 💡",
    likes: "784",
    comments: "92",
    saved: "67",
  },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header/Cover Image */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20" />
        <div className="absolute inset-0 bg-[url('/dashboard-cover.jpg')] bg-cover bg-center opacity-50" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            {/* Profile Picture */}
            <div className="relative mx-auto sm:mx-0">
              <div className="h-32 w-32 rounded-full border-4 border-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f059da] to-purple-600" />
                <div className="absolute inset-1 rounded-full bg-zinc-900" />
                <div className="absolute inset-2 rounded-full bg-[url('/avatar.jpg')] bg-cover bg-center" />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="absolute bottom-0 right-0 text-white bg-[#f059da] hover:bg-[#f059da]/90 h-8 w-8"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            {/* Name & Bio */}
            <div className="text-center sm:text-left pb-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-white">Sarah Anderson</h1>
                <BadgeCheck className="h-5 w-5 text-[#f059da]" />
              </div>
              <p className="text-zinc-400">@socialmedia_sarah</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                <div className="flex items-center gap-1 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Link className="h-4 w-4" />
                  <span className="text-sm">sarahanderson.com</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Joined Dec 2023</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center sm:justify-start">
            <Button className="bg-[#f059da] hover:bg-[#f059da]/90 text-white flex-1 sm:flex-initial">
              Edit Profile
            </Button>
            <Button variant="outline" className="border-zinc-800 hover:bg-[#f059da]/10 flex-1 sm:flex-initial">
              Share Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-all group">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 px-4 sm:px-6 lg:px-8">
        {/* Achievements */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <Trophy className="h-5 w-5 text-[#f059da]" />
              Achievements
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs sm:text-sm">
              Track your growth milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/50 group hover:border-zinc-700/50 transition-all"
              >
                <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                  <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {achievement.description}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-zinc-400">
                      {achievement.progress}%
                    </div>
                  </div>
                  <Progress
                    value={achievement.progress}
                    className="h-1 mt-2"
                    indicatorClassName={`${
                      achievement.progress === 100
                        ? "bg-gradient-to-r from-[#f059da] to-purple-600"
                        : "bg-[#f059da]"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <MessageCircle className="h-5 w-5 text-[#f059da]" />
              Recent Posts
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs sm:text-sm">
              Your latest updates and content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/50 transition-all space-y-3"
              >
                <p className="text-sm text-zinc-300 break-words">{post.content}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
                  <button className="flex items-center gap-1 hover:text-[#f059da] transition-colors">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#f059da] transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#f059da] transition-colors">
                    <Bookmark className="h-4 w-4" />
                    {post.saved}
                  </button>
                  <button className="flex items-center gap-1 hover:text-[#f059da] transition-colors ml-auto">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
