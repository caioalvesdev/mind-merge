
import { LandingContent } from "@/components/Lading-content";
import { LandingHero } from "@/components/Lading-hero";
import { LandingNavbar } from "@/components/Lading-navbar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full">
        <div className="h-full">
          <LandingNavbar />
          <LandingHero />
          <LandingContent />
        </div>
      </div>
    </main>
   
  );
}
