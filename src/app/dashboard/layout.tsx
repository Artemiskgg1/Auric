import SideNav from "@/components/SideNav";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      {/* UserButton placed outside flex-grow container */}
      <div className="absolute top-4 right-4 z-50 ">
        <UserButton />
      </div>

      <div className="w-20 flex-none lg:w-64 md:border-r">
        <SideNav />
      </div>

      <div className="flex-grow md:mt-12 flex-1 w-full md:overflow-y-auto sm:px-6 md:px-4 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
