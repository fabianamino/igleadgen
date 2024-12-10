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
  Hash,
  TrendingUp,
  Users,
  BarChart2,
  Filter,
  ArrowUpRight,
} from "lucide-react";

interface Hashtag {
  name: string;
  posts: number;
  reach: number;
  engagement: number;
  trend: "up" | "down" | "stable";
  category: string;
}

const demoHashtags: Hashtag[] = [
  {
    name: "photography",
    posts: 450000000,
    reach: 890000000,
    engagement: 4.5,
    trend: "up",
    category: "Art",
  },
  {
    name: "nature",
    posts: 380000000,
    reach: 720000000,
    engagement: 3.8,
    trend: "stable",
    category: "Nature",
  },
  {
    name: "travel",
    posts: 520000000,
    reach: 950000000,
    engagement: 4.2,
    trend: "up",
    category: "Travel",
  },
  {
    name: "fitness",
    posts: 280000000,
    reach: 520000000,
    engagement: 5.1,
    trend: "up",
    category: "Fitness",
  },
  {
    name: "foodie",
    posts: 320000000,
    reach: 680000000,
    engagement: 4.8,
    trend: "stable",
    category: "Food",
  },
  {
    name: "technology",
    posts: 180000000,
    reach: 420000000,
    engagement: 3.5,
    trend: "down",
    category: "Technology",
  }
];

const categories = [
  "All",
  "Art",
  "Nature",
  "Travel",
  "Fashion",
  "Food",
  "Technology",
  "Fitness",
];

export default function HashtagsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minEngagement, setMinEngagement] = useState([0]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const filteredHashtags = demoHashtags.filter((hashtag) => {
    const matchesSearch = hashtag.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || hashtag.category === selectedCategory;
    const matchesEngagement = hashtag.engagement >= minEngagement[0];
    return matchesSearch && matchesCategory && matchesEngagement;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-gradient-to-r from-zinc-900/50 to-transparent p-6 rounded-lg border border-zinc-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f059da1a,transparent)] pointer-events-none" />
        <div className="relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Search Hashtags
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl">
            Find the perfect hashtags for your content to increase reach and engagement. 
            Our AI-powered system analyzes millions of posts to provide you with the most effective hashtags.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-zinc-900/30 p-6 rounded-lg border border-zinc-800/50 backdrop-blur-sm">
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#f059da]" />
          <Input
            placeholder="Search hashtags..."
            className="pl-10 bg-zinc-900/50 border-zinc-800 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 text-white placeholder:text-zinc-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
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
            <label className="text-sm font-medium text-zinc-300">Min. Engagement</label>
            <span className="text-sm font-medium text-[#f059da]">{minEngagement[0]}%</span>
          </div>
          <Slider
            defaultValue={[0]}
            max={10}
            step={0.1}
            value={minEngagement}
            onValueChange={setMinEngagement}
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
        {filteredHashtags.map((hashtag) => (
          <div
            key={hashtag.name}
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300"
          >
            {/* Card inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#f059da] transition-colors">
                    #{hashtag.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">
                      {hashtag.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp
                        className={`h-3 w-3 ${
                          hashtag.trend === "up"
                            ? "text-green-500"
                            : hashtag.trend === "down"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <span
                        className={
                          hashtag.trend === "up"
                            ? "text-green-500"
                            : hashtag.trend === "down"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }
                      >
                        {hashtag.trend === "up"
                          ? "Trending Up"
                          : hashtag.trend === "down"
                          ? "Trending Down"
                          : "Stable"}
                      </span>
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Posts
                  </p>
                  <p className="font-semibold text-white">
                    {formatNumber(hashtag.posts)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Reach
                  </p>
                  <p className="font-semibold text-white">
                    {formatNumber(hashtag.reach)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1 flex items-center gap-1">
                    <BarChart2 className="h-3 w-3" /> Engagement
                  </p>
                  <p className="font-semibold text-white">
                    {hashtag.engagement}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
