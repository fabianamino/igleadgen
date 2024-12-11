import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "IgLeadGen || Instagram Growth Tool",
  description: "IgLeadGen - Instagram Growth and Lead Generation Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="h-full relative bg-[#0a0a0a]">
            {/* Creative background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              {/* Base pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, rgba(240, 89, 218, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 0% 0%, rgba(240, 89, 218, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 100% 0%, rgba(240, 89, 218, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 0% 100%, rgba(240, 89, 218, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 100% 100%, rgba(240, 89, 218, 0.03) 0%, transparent 50%)
                  `,
                }}
                className="w-full h-full opacity-40"
              />

              {/* Honeycomb pattern */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    radial-gradient(circle at 0% 0%, transparent 50%, rgba(240, 89, 218, 0.02) 50%, transparent 100%),
                    radial-gradient(circle at 100% 0%, transparent 50%, rgba(240, 89, 218, 0.02) 50%, transparent 100%),
                    radial-gradient(circle at 0% 100%, transparent 50%, rgba(240, 89, 218, 0.02) 50%, transparent 100%),
                    radial-gradient(circle at 100% 100%, transparent 50%, rgba(240, 89, 218, 0.02) 50%, transparent 100%)
                  `,
                  backgroundSize: '64px 64px',
                }}
                className="w-full h-full opacity-30"
              />

              {/* Diagonal lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 2px,
                      rgba(240, 89, 218, 0.02) 2px,
                      rgba(240, 89, 218, 0.02) 4px
                    )
                  `,
                }}
                className="w-full h-full opacity-20"
              />

              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay animate-gradient"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      115deg,
                      transparent 0%,
                      rgba(240, 89, 218, 0.1) 25%,
                      transparent 47%,
                      transparent 53%,
                      rgba(240, 89, 218, 0.1) 75%,
                      transparent 100%
                    )
                  `,
                  backgroundSize: '400% 400%',
                }}
              />

              {/* Ambient light effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#f059da08,transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,#f059da08,transparent)]" />
              
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light bg-[url('/noise.png')]" />

              {/* Vignette effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
            </div>

            {/* Content */}
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="hidden md:flex h-full md:w-72 md:flex-col md:fixed md:inset-y-0 z-50">
                <Sidebar />
              </div>

              {/* Main content */}
              <main className="md:pl-72 flex-1 min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-6 mt-20">
                  <Toaster position="top-center" />
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
