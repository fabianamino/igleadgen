'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, Users, BarChart2, Settings, LogOut, ArrowRight, MessageCircle, Bot, Clock, Target, Instagram, Zap, Database, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { cn } from "@/lib/utils";

const HomePage = () => {
  const router = useRouter();

  const tools = [
    {
      label: "Search Hashtags",
      icon: Hash,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/hashtag-search",
      description: "Find trending hashtags for your niche",
      stats: "450M+ hashtags"
    },
    {
      label: "Find Users",
      icon: Users,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/users",
      description: "Discover potential followers and collaborators",
      stats: "100K+ profiles"
    },
    {
      label: "DM Automation",
      icon: MessageCircle,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/dm",
      description: "Automate Instagram DMs with smart replies",
      stats: "AI-powered"
    },
    {
      label: "Smart Engagement",
      icon: Zap,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/engagement",
      description: "Auto-engage with your target audience",
      stats: "24/7 Active"
    },
    {
      label: "Hashtag Generator",
      icon: Bot,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/hashtag-generator",
      description: "Generate AI-powered hashtags for your posts",
      stats: "AI-powered"
    },
    {
      label: "Content Scheduler",
      icon: Clock,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/scheduler",
      description: "Schedule and auto-publish content",
      stats: "Smart timing"
    },
    {
      label: "Growth Targeting",
      icon: Target,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/automation/targeting",
      description: "Target and engage specific audiences",
      stats: "Precision tools"
    },
    {
      label: "Analytics",
      icon: BarChart2,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/analytics",
      description: "Track your growth and engagement",
      stats: "Real-time data"
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/settings",
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
        <div className="flex-1 p-4 overflow-hidden">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-x-3">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white/70 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-white/90">
                    Dashboard
                  </span>
                  <span className="text-xs text-white/50">
                    Manage your Instagram growth
                  </span>
                </div>
              </div>
            </div>

            {/* Tools Grid - Compact version */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-6xl space-y-6">
                {/* Hero Section - More compact */}
                <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-black/50 via-black/30 to-black/10">
                  <div className="relative p-4 space-y-3 flex flex-col items-center text-center">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.08] bg-black/50 text-xs text-white/90">
                      <span className="mr-1.5 text-[#f059da]">✨</span>
                      Welcome to "Lead Gen" Net Growth
                    </div>
                    <div className="max-w-lg mx-auto">
                      <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                        Grow Your Instagram{" "}
                        <span className="text-white/80">With Smart Tools</span>
                      </h2>
                      <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mt-2">
                        Leverage our tools to expand your reach and track your growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <button
                      key={tool.label}
                      className="group relative cursor-pointer border border-white/[0.08] hover:border-[#f059da]/20 bg-gradient-to-br from-white/[0.05] to-transparent hover:from-[#f059da]/10 hover:to-[#f059da]/[0.02] active:from-[#f059da]/5 active:to-transparent transition-all duration-300 rounded-lg overflow-hidden"
                      onClick={() => router.push(tool.href)}
                    >
                      {/* Shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="px-5 py-4 h-full flex items-center space-x-4 relative">
                        <div className={cn(
                          "p-2 w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-300",
                          "bg-white/[0.03] group-hover:bg-[#f059da]/10 group-active:bg-[#f059da]/5"
                        )}>
                          <tool.icon className="w-6 h-6 text-white/80 group-hover:text-[#f059da] transition-all duration-300" />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <h3 className="font-semibold text-[1.1rem] text-white/90 group-hover:text-white transition-colors truncate leading-tight">
                            {tool.label}
                          </h3>
                          <p className="text-white/50 text-[0.85rem] truncate group-hover:text-white/70 transition-colors leading-tight mt-1.5">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;