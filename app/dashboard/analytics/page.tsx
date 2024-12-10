"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  BarChart2,
  Calendar,
} from "lucide-react";

const metrics = [
  {
    title: "Total Followers",
    value: "124.7K",
    change: "+12.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: "+0.5%",
    trend: "up",
    icon: Heart,
  },
  {
    title: "Post Reach",
    value: "892.1K",
    change: "-2.1%",
    trend: "down",
    icon: Eye,
  },
  {
    title: "Comments",
    value: "11.2K",
    change: "+8.1%",
    trend: "up",
    icon: MessageCircle,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 p-8 rounded-xl border border-zinc-800/50 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f059da15,transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
                Analytics Overview
              </h1>
              <p className="text-zinc-400 mt-2 max-w-2xl text-lg">
                Track your growth and engagement metrics across all your social media platforms.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="7d">
                <SelectTrigger className="w-36 bg-zinc-900/80 border-zinc-700/50 focus:ring-[#f059da] focus:ring-opacity-50 text-white hover:bg-zinc-800/80 transition-colors">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="24h" className="text-zinc-300 focus:bg-[#f059da]/10">Last 24 Hours</SelectItem>
                  <SelectItem value="7d" className="text-zinc-300 focus:bg-[#f059da]/10">Last 7 Days</SelectItem>
                  <SelectItem value="30d" className="text-zinc-300 focus:bg-[#f059da]/10">Last 30 Days</SelectItem>
                  <SelectItem value="90d" className="text-zinc-300 focus:bg-[#f059da]/10">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#f059da] hover:bg-[#f059da]/90 text-white shadow-lg shadow-[#f059da]/20 transition-all hover:shadow-xl hover:shadow-[#f059da]/30">
                <Calendar className="w-4 h-4 mr-2" />
                Custom Range
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">
                {metric.title}
              </CardTitle>
              <div className="p-2 rounded-full bg-zinc-800/50 group-hover:bg-[#f059da]/10 transition-colors">
                <metric.icon className="h-4 w-4 text-zinc-400 group-hover:text-[#f059da]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white tracking-tight">{metric.value}</div>
              <div className="flex items-center mt-1">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
                <span
                  className={`text-sm font-medium ml-1 ${
                    metric.trend === "up" ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Follower Growth */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Follower Growth</CardTitle>
                <CardDescription className="text-zinc-400">
                  Daily follower count over time
                </CardDescription>
              </div>
              <div className="p-2 rounded-full bg-zinc-800/50">
                <TrendingUp className="h-4 w-4 text-[#f059da]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-zinc-500 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30">
              Chart Component Here
            </div>
          </CardContent>
        </Card>

        {/* Engagement Analysis */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Engagement Analysis</CardTitle>
                <CardDescription className="text-zinc-400">
                  Likes, comments, and saves distribution
                </CardDescription>
              </div>
              <div className="p-2 rounded-full bg-zinc-800/50">
                <BarChart2 className="h-4 w-4 text-[#f059da]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-zinc-500 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30">
              Chart Component Here
            </div>
          </CardContent>
        </Card>

        {/* Best Performing Posts */}
        <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Best Performing Posts</CardTitle>
                <CardDescription className="text-zinc-400">
                  Your top posts by engagement rate
                </CardDescription>
              </div>
              <Button variant="outline" className="border-zinc-700/50 hover:border-zinc-600 hover:bg-[#f059da]/10 hover:text-white transition-colors">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-zinc-900/80 to-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group"
                >
                  <div className="w-16 h-16 rounded-lg bg-zinc-800/50 flex items-center justify-center group-hover:bg-[#f059da]/10 transition-colors">
                    <Eye className="h-6 w-6 text-zinc-500 group-hover:text-[#f059da]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">Post Caption #{post}</h4>
                    <p className="text-xs text-zinc-400 mt-1">Posted 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">45.2K</div>
                    <div className="text-xs text-zinc-400">Reach</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">5.8%</div>
                    <div className="text-xs text-zinc-400">Engagement</div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white hover:bg-[#f059da]/10 transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
