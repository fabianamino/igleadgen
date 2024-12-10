"use client";

import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  User,
  Hash,
  LineChart,
  TrendingUp,
  PlusCircle,
  FileText,
  Settings,
  Home,
  LogOut
} from "lucide-react";

const font = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const routes = {
  general: [
    {
      label: "General",
      icon: Home,
      href: "/dashboard",
      color: "text-[#f059da]",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      color: "text-[#f059da]",
    },
  ],
  features: [
    {
      label: "Core Features",
      icon: Hash,
      href: "/dashboard/features",
      color: "text-[#f059da]",
    },
    {
      label: "Hashtags",
      icon: Hash,
      href: "/dashboard/hashtags",
      color: "text-[#f059da]",
    },
  ],
  analytics: [
    {
      label: "Insights",
      icon: LineChart,
      href: "/dashboard/insights",
      color: "text-[#f059da]",
    },
    {
      label: "Trends",
      icon: TrendingUp,
      href: "/dashboard/trends",
      color: "text-[#f059da]",
    },
  ],
  content: [
    {
      label: "New",
      icon: PlusCircle,
      href: "/dashboard/new",
      color: "text-[#f059da]",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/dashboard/reports",
      color: "text-[#f059da]",
    },
  ],
  system: [
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-[#f059da]",
    },
  ]
};

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="relative space-y-4 py-4 flex flex-col h-full bg-[#0a0a0a] text-white">
      {/* Clip path decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#f059da]/20 to-transparent" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#f059da]/20 to-transparent" style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }} />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      
      <div className="px-3 py-2 flex-1 relative z-10">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 group">
          <div className="relative w-10 h-10 mr-4 transform group-hover:scale-105 transition-transform">
            <Image
              fill
              alt="Logo"
              src="/instagram-icon.png"
              className="object-contain drop-shadow-lg"
            />
          </div>
          <h1 className={cn("text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f059da] to-[#f059da]/70", 
            font.className,
            "group-hover:to-[#f059da] transition-all duration-300"
          )}>
            IgLeadGen
          </h1>
        </Link>

        <div className="space-y-8">
          {Object.entries(routes).map(([section, items]) => (
            <div key={section} className="space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold ml-3 mb-2 flex items-center">
                <span className="w-8 h-[1px] bg-gradient-to-r from-[#f059da]/50 to-transparent mr-2"></span>
                {section}
              </h2>
              <div className="space-y-1">
                {items.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-300 relative overflow-hidden",
                      "hover:bg-gradient-to-r hover:from-[#f059da]/10 hover:to-transparent",
                      pathname === route.href 
                        ? "bg-gradient-to-r from-[#f059da]/20 to-transparent text-white" 
                        : "text-zinc-400 hover:text-zinc-200",
                    )}
                  >
                    {pathname === route.href && (
                      <div className="absolute left-0 top-0 w-[2px] h-full bg-[#f059da] shadow-[0_0_8px_0_#f059da]" />
                    )}
                    <div className="flex items-center flex-1 relative">
                      <route.icon className={cn(
                        "h-5 w-5 mr-3 transition-transform duration-300",
                        "group-hover:scale-110",
                        pathname === route.href ? "text-[#f059da]" : "text-zinc-400 group-hover:text-[#f059da]"
                      )} />
                      <span className="relative">
                        {route.label}
                        {pathname === route.href && (
                          <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-[#f059da]/50 to-transparent" />
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 py-2 relative z-10">
        <Link
          href="/auth/logout"
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-300 relative overflow-hidden
            hover:bg-gradient-to-r hover:from-[#f059da]/10 hover:to-transparent text-zinc-400 hover:text-zinc-200"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-zinc-400 group-hover:text-[#f059da] transition-transform duration-300 group-hover:scale-110" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
