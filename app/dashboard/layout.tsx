import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative">
      {/* Background gradient with blur effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#f059da]/20" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      
      {/* Animated background patterns */}
      <div className="fixed inset-0 opacity-20 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#f059da12,transparent)]" />
      </div>

      {/* Sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-40">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md:pl-72 flex flex-col min-h-screen">
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
