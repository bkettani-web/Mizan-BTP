import type { ReactNode } from "react";

import { Sidebar } from "@/components/navigation/sidebar";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { LanguageToggle } from "@/components/navigation/language-toggle";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <BottomNav />
      <LanguageToggle className="fixed top-3 end-3 z-40 shadow-[var(--shadow-card-hover)] md:hidden" />
      <main className="bg-blueprint min-h-screen pb-28 md:ms-64 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
