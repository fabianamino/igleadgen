"use client";

import { Card } from "@/components/ui/card";
import { Hash, Users, BarChart2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const tools = [
    {
      label: "Search Hashtags",
      icon: Hash,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/dashboard/hashtags",
      description: "Find trending hashtags for your niche"
    },
    {
      label: "Find Users",
      icon: Users,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/dashboard/users",
      description: "Discover potential followers and collaborators"
    },
    {
      label: "Analytics",
      icon: BarChart2,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/dashboard/analytics",
      description: "Track your growth and engagement"
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-[#f059da]",
      bgColor: "bg-[#f059da]/10",
      href: "/dashboard/settings",
      description: "Customize your experience"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-[#f059da] text-transparent bg-clip-text">
          Welcome to IgLeadGen
        </h2>
        <p className="text-zinc-400 font-light text-sm md:text-lg">
          Explore our tools to grow your Instagram presence
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <div 
            key={tool.href}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card
              className="group p-6 border-black/5 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer bg-black/40 backdrop-blur-sm border border-[#f059da]/20 hover:border-[#f059da]/40 hover:scale-[1.02]"
              onClick={() => router.push(tool.href)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-x-4">
                  <div className={`p-2 w-fit rounded-md ${tool.bgColor} group-hover:bg-[#f059da]/20 transition-colors duration-300`}>
                    <tool.icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <div className="font-semibold text-white group-hover:text-[#f059da] transition-colors duration-300">
                    {tool.label}
                  </div>
                </div>
                <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;