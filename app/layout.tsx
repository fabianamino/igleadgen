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
            {/* Subtle background */}
            <div className="fixed inset-0 -z-10">
              {/* Very faint grid */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-50% -50%',
                  transform: 'rotateX(75deg)',
                  backgroundImage: `
                    linear-gradient(90deg, rgba(240, 89, 218, 0.03) 1px, transparent 1px),
                    linear-gradient(rgba(240, 89, 218, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '150px 150px',
                  backgroundPosition: 'center',
                  transformOrigin: 'center center',
                }}
              />

              {/* Soft gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
              
              {/* Very subtle glow */}
              <div className="fixed inset-x-0 bottom-0 h-[50vh] bg-[#f059da]/[0.02] blur-[150px]" />
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
