"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  Search,
  Users,
  Heart,
  MessageCircle,
  Filter,
  ArrowUpRight,
  UserCheck,
  Star,
  Verified,
  Globe2,
} from "lucide-react";

interface User {
  username: string;
  name: string;
  followers: number;
  engagement: number;
  category: string;
  isVerified: boolean;
  location: string;
  avatar: string;
  posts: number;
  bio: string;
}

const demoUsers: User[] = [
  {
    username: "naturephotographer",
    name: "Alex Thompson",
    followers: 450000,
    engagement: 4.5,
    category: "Photography",
    isVerified: true,
    location: "New York, USA",
    avatar: "/avatars/1.jpg",
    posts: 892,
    bio: "Professional nature photographer 📸 Wildlife enthusiast 🦁",
  },
  {
    username: "travelwithsarah",
    name: "Sarah Chen",
    followers: 280000,
    engagement: 3.8,
    category: "Travel",
    isVerified: false,
    location: "Singapore",
    avatar: "/avatars/2.jpg",
    posts: 654,
    bio: "Travel blogger ✈️ 45 countries and counting 🌎",
  },
  {
    username: "fitnessguru",
    name: "Mike Johnson",
    followers: 520000,
    engagement: 5.2,
    category: "Fitness",
    isVerified: true,
    location: "Los Angeles, USA",
    avatar: "/avatars/3.jpg",
    posts: 1243,
    bio: "Personal trainer 💪 Nutrition expert 🥗",
  },
  {
    username: "techreview",
    name: "David Kim",
    followers: 320000,
    engagement: 3.5,
    category: "Technology",
    isVerified: false,
    location: "Seoul, Korea",
    avatar: "/avatars/4.jpg",
    posts: 567,
    bio: "Tech reviewer 📱 Gaming enthusiast 🎮",
  },
  {
    username: "foodielove",
    name: "Maria Garcia",
    followers: 180000,
    engagement: 4.8,
    category: "Food",
    isVerified: false,
    location: "Barcelona, Spain",
    avatar: "/avatars/5.jpg",
    posts: 789,
    bio: "Food blogger 🍳 Recipe creator 🥘",
  },
];

const categories = [
  "All",
  "Photography",
  "Travel",
  "Fitness",
  "Technology",
  "Food",
  "Fashion",
  "Art",
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minFollowers, setMinFollowers] = useState([0]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const filteredUsers = demoUsers.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || user.category === selectedCategory;
    const matchesFollowers = user.followers >= minFollowers[0] * 10000; // Convert slider value to actual followers
    return matchesSearch && matchesCategory && matchesFollowers;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-gradient-to-r from-zinc-900/50 to-transparent p-6 rounded-lg border border-zinc-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f059da1a,transparent)] pointer-events-none" />
        <div className="relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Find Users
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl">
            Discover and connect with Instagram influencers and content creators.
            Our AI helps you find the perfect match for your brand or campaign.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800/50 backdrop-blur-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#f059da]" />
          <Input
            placeholder="Search users..."
            className="pl-10 bg-zinc-900/50 border-zinc-800 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 text-white placeholder:text-zinc-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-zinc-900/50 border-zinc-800 focus:ring-[#f059da] focus:ring-opacity-50 text-white">
            <SelectValue placeholder="Category" className="text-zinc-500" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="focus:bg-[#f059da]/10 focus:text-white text-zinc-300 hover:text-white"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-y-3 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">
              Min. Followers
            </label>
            <span className="text-sm font-medium text-[#f059da]">
              {minFollowers[0]}K+
            </span>
          </div>
          <Slider
            defaultValue={[0]}
            max={500}
            step={10}
            value={minFollowers}
            onValueChange={setMinFollowers}
            className="[&_[role=slider]]:bg-[#f059da]"
          />
        </div>
        <Button
          variant="outline"
          className="bg-zinc-900/50 border-zinc-800 hover:bg-[#f059da]/10 hover:text-white transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user.username}
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300"
          >
            {/* Card inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#f059da] transition-colors">
                        {user.username}
                      </h3>
                      {user.isVerified && (
                        <Verified className="h-4 w-4 text-[#f059da]" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-400">{user.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                      <Globe2 className="h-3 w-3" />
                      {user.location}
                    </div>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-[#f059da]/10"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Bio */}
              <p className="text-sm text-zinc-400">{user.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <UserCheck className="h-3 w-3" /> Followers
                  </p>
                  <p className="font-semibold text-white">
                    {formatNumber(user.followers)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <Star className="h-3 w-3" /> Engagement
                  </p>
                  <p className="font-semibold text-white">{user.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> Posts
                  </p>
                  <p className="font-semibold text-white">
                    {formatNumber(user.posts)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#f059da] hover:bg-[#f059da]/90 text-white"
                  size="sm"
                >
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-zinc-800 hover:bg-[#f059da]/10 hover:text-white"
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
