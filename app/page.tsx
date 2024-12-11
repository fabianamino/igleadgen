'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, Users, BarChart2, Settings, LogOut, ArrowRight, MessageCircle, Bot, Clock, Target, Instagram, Zap, Database, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { cn } from "@/lib/utils";
import Header from '@/components/common/Logo';

const HomePage = () => {
  const router = useRouter();

  const tools = [
    {
      label: "Search Hashtags",
      icon: Hash,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/hashtags",
      description: "Find trending hashtags for your niche",
      stats: "450M+ hashtags"
    },
    {
      label: "Find Users",
      icon: Users,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/users",
      description: "Discover potential followers and collaborators",
      stats: "100K+ profiles"
    },
    {
      label: "DM Automation",
      icon: MessageCircle,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/automation/dm",
      description: "Automate Instagram DMs with smart replies",
      stats: "AI-powered"
    },
    {
      label: "Smart Engagement",
      icon: Zap,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/automation/engagement",
      description: "Auto-engage with your target audience",
      stats: "24/7 Active"
    },
    {
      label: "Content Scheduler",
      icon: Clock,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/automation/scheduler",
      description: "Schedule and auto-publish content",
      stats: "Smart timing"
    },
    {
      label: "Growth Targeting",
      icon: Target,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/automation/targeting",
      description: "Target and engage specific audiences",
      stats: "Precision tools"
    },
    {
      label: "Analytics",
      icon: BarChart2,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/analytics",
      description: "Track your growth and engagement",
      stats: "Real-time data"
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/app/settings",
      description: "Customize your experience",
      stats: "Full control"
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.refresh();
      router.push('/auth/login');
    } catch (err) {
      console.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="container h-full mx-auto p-4">
        <div className="h-[66vh] flex flex-col animate-fade-in">
          {/* Hero Section - More compact */}
          <div className="relative overflow-hidden rounded-xl border border-zinc-800/50 mb-3">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f059da]/20 via-[#f059da]/5 to-transparent" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/grid.svg')",
                  backgroundSize: "24px",
                  backgroundRepeat: "repeat",
                  opacity: 0.1,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f059da15,transparent)]" />
            </div>

            <div className="relative p-3 space-y-2">
              <div className="inline-flex items-center px-2 py-1 rounded-full border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm text-xs text-white/90">
                Welcome to the future of Instagram growth
              </div>
              <h2 className="text-xl md:text-2xl font-bold">
                <span className="text-white">Grow Your Instagram</span>{" "}
                <span className="text-white/90">With Smart Tools</span>
              </h2>
              <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                Leverage our tools to expand your reach and track your growth.
              </p>
            </div>
          </div>

          {/* Tools Grid - Compact version */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 h-[calc(100%-6rem)] overflow-y-auto">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="relative group cursor-pointer hover:shadow-lg transition-all duration-300 border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm h-full"
                onClick={() => router.push(tool.href)}
              >
                <div className="p-2 h-full flex flex-col">
                  <div className={cn("p-1.5 w-8 h-8 rounded-lg mb-2", tool.bgColor)}>
                    <tool.icon className={cn("w-5 h-5", tool.color)} />
                  </div>
                  <div className="space-y-0.5 flex-grow">
                    <h3 className="font-semibold text-xs text-white group-hover:text-[#f059da] transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-white/70 text-[0.65rem] line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[0.6rem] text-white/50">{tool.stats}</span>
                    <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-[#f059da] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="absolute bottom-2 right-2 text-white/70 hover:text-white hover:bg-zinc-900/50 text-xs py-1 px-2 h-auto"
            onClick={handleLogout}
          >
            <LogOut className="w-3 h-3 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;