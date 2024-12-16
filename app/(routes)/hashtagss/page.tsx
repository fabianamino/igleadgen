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
import { cn } from "@/lib/utils";

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
    engagement: 5.2,
    trend: "up",
    category: "Travel",
  },
  {
    name: "food",
    posts: 410000000,
    reach: 780000000,
    engagement: 4.1,
    trend: "down",
    category: "Food",
  },
  {
    name: "fitness",
    posts: 350000000,
    reach: 670000000,
    engagement: 3.5,
    trend: "up",
    category: "Health",
  },
];

const HashtagsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [minPosts, setMinPosts] = useState(0);
  const [minEngagement, setMinEngagement] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredHashtags = demoHashtags.filter((hashtag) => {
    const matchesSearch = hashtag.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" ||
      hashtag.category.toLowerCase() === category.toLowerCase();
    const matchesPosts = hashtag.posts >= minPosts * 1000000;
    const matchesEngagement = hashtag.engagement >= minEngagement;

    return (
      matchesSearch && matchesCategory && matchesPosts && matchesEngagement
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-800/50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f059da]/10 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/grid.svg')",
              backgroundSize: "24px",
              backgroundRepeat: "repeat",
              opacity: 0.1,
            }}
          />
        </div>

        <div className="relative p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-[#f059da]" />
                <Input
                  placeholder="Search hashtags..."
                  className={cn(
                    "pl-9 bg-zinc-900/50 border-zinc-800",
                    "focus:border-[#f059da]/50 focus:ring-[#f059da]/20",
                    "text-white placeholder:text-zinc-400",
                    "transition-colors"
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50">
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-zinc-900/90 border-zinc-800 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">
                  Min. Posts (in millions)
                </label>
                <Slider
                  value={[minPosts]}
                  onValueChange={([value]) => setMinPosts(value)}
                  max={1000}
                  step={10}
                  className="py-4"
                />
                <div className="text-sm text-[#f059da]">{minPosts}M+</div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-300">
                  Min. Engagement Rate
                </label>
                <Slider
                  value={[minEngagement]}
                  onValueChange={([value]) => setMinEngagement(value)}
                  max={10}
                  step={0.1}
                  className="py-4"
                />
                <div className="text-sm text-[#f059da]">{minEngagement}%+</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hashtags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHashtags.map((hashtag) => (
          <div
            key={hashtag.name}
            className="group relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50 space-y-4 hover:border-[#f059da]/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-[#f059da]" />
                  <h3 className="font-medium text-lg text-white">{hashtag.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{hashtag.category}</p>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-900 hover:border-[#f059da]/50 text-white hover:text-[#f059da] transition-all duration-300"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm relative">
              <div className="space-y-2 text-center p-3 bg-zinc-900/70 rounded-lg border border-zinc-800/50">
                <Hash className="h-4 w-4 mx-auto text-[#f059da]" />
                <div className="font-medium text-white">
                  {(hashtag.posts / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-zinc-400">Posts</div>
              </div>

              <div className="space-y-2 text-center p-3 bg-zinc-900/70 rounded-lg border border-zinc-800/50">
                <Users className="h-4 w-4 mx-auto text-[#f059da]" />
                <div className="font-medium text-white">
                  {(hashtag.reach / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-zinc-400">Reach</div>
              </div>

              <div className="space-y-2 text-center p-3 bg-zinc-900/70 rounded-lg border border-zinc-800/50">
                <BarChart2 className="h-4 w-4 mx-auto text-[#f059da]" />
                <div className="font-medium text-white">{hashtag.engagement}%</div>
                <div className="text-xs text-zinc-400">Engagement</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TrendingUp
                className={cn(
                  "h-4 w-4",
                  hashtag.trend === "up"
                    ? "text-emerald-500"
                    : hashtag.trend === "down"
                    ? "text-red-500"
                    : "text-zinc-500"
                )}
              />
              <span
                className={cn(
                  hashtag.trend === "up"
                    ? "text-emerald-500"
                    : hashtag.trend === "down"
                    ? "text-red-500"
                    : "text-zinc-500"
                )}
              >
                {hashtag.trend === "up"
                  ? "Trending up"
                  : hashtag.trend === "down"
                  ? "Trending down"
                  : "Stable"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagsPage;
