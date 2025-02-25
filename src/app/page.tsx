import Hero from "@/components/hero/Hero";
import Nav from "@/components/hero/Nav";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0ECFF] via-[#F4F9FF] to-white">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Nav />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Hero />
      </div>
    </div>
  );
}
