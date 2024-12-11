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
        <div className="h-[66vh] flex flex-col animate-fade-in relative">
          {/* Ambient background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,#f059da15,transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_80%_60%,#f059da08,transparent)]" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          
          {/* Hero Section - More compact */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] mb-3 bg-gradient-to-br from-black/50 via-black/30 to-black/10">
            <div className="relative p-3 space-y-2">
              <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.08] bg-black/50 text-xs text-white/90">
                <span className="mr-1.5 text-[#f059da]">✨</span>
                Welcome to the future of Instagram growth
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                Grow Your Instagram{" "}
                <span className="text-white/80">With Smart Tools</span>
              </h2>
              <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                Leverage our tools to expand your reach and track your growth.
              </p>
            </div>
          </div>

          {/* Tools Grid - Compact version */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl w-full">
              {tools.map((tool) => (
                <button
                  key={tool.label}
                  className="group relative cursor-pointer border border-white/[0.08] hover:border-[#f059da]/20 bg-gradient-to-br from-white/[0.05] to-transparent hover:from-[#f059da]/10 hover:to-[#f059da]/[0.02] active:from-[#f059da]/5 active:to-transparent transition-all duration-300 rounded-lg overflow-hidden"
                  onClick={() => router.push(tool.href)}
                >
                  {/* Shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="px-2.5 py-2 h-full flex items-center space-x-2.5 relative">
                    <div className={cn(
                      "p-1 w-6 h-6 rounded-lg flex-shrink-0 transition-all duration-300",
                      "bg-white/[0.03] group-hover:bg-[#f059da]/10 group-active:bg-[#f059da]/5"
                    )}>
                      <tool.icon className="w-4 h-4 text-white/80 group-hover:text-[#f059da] transition-all duration-300" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <h3 className="font-semibold text-[0.8rem] text-white/90 group-hover:text-white transition-colors truncate leading-tight">
                        {tool.label}
                      </h3>
                      <p className="text-white/50 text-[0.65rem] truncate group-hover:text-white/70 transition-colors leading-tight mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="absolute bottom-2 right-2 text-white/60 hover:text-white bg-gradient-to-br from-black/50 via-black/30 to-black/10 hover:from-black/70 hover:via-black/50 hover:to-black/30 text-xs py-1.5 px-3 h-auto rounded-lg border border-white/[0.08] transition-all duration-300"
            onClick={handleLogout}
          >
            <LogOut className="w-3 h-3 mr-1.5 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative">
              Logout
              <span className="absolute inset-x-0 -bottom-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;