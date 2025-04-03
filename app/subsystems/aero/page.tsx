'use client';

import { AeroHeader } from "@/components/aero/AeroHeader";
import { AeroContentSection } from "@/components/aero/AeroContentSection";

export default function AerodynamicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1E2A4A] text-white">
      <AeroHeader />
      <AeroContentSection />
    </div>
  );
}
