import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* 3D Grid background */}
      <div className="fixed inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(transparent,#000)]">
        <div
          style={{
            position: 'absolute',
            inset: '-50% -50%',
            transform: 'rotateX(75deg)',
            backgroundImage: `
              linear-gradient(90deg, rgba(240, 89, 218, 0.3) 1px, transparent 0),
              linear-gradient(rgba(240, 89, 218, 0.3) 1px, transparent 0)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: 'center',
            transformOrigin: 'center center',
            perspective: '1000px',
          }}
        />
      </div>

      {/* Fade effects */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Glow effect */}
      <div className="fixed inset-x-0 bottom-0 z-5 h-[40vh] bg-[#f059da]/10 blur-[100px]" />

      {/* Sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-20">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:pl-72 flex flex-col min-h-screen relative z-20">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 mt-16 max-w-7xl mx-auto w-full">
          <div className="space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
 
export default DashboardLayout;
