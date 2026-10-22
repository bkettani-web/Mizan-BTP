"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between rounded-[1.75rem] border border-border/60 bg-white/90 px-1.5 py-1.5 shadow-[var(--shadow-float)] backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center justify-end gap-1 py-1.5 text-center"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full transition-all duration-200 ease-out",
                  isActive
                    ? "-translate-y-2 bg-terracotta shadow-[0_8px_16px_-6px_rgba(217,101,40,0.65)]"
                    : "translate-y-0 bg-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    isActive ? "text-white" : "text-anthracite",
                  )}
                />
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold leading-none transition-colors",
                  isActive ? "-translate-y-2 text-terracotta" : "translate-y-0 text-anthracite/70",
                )}
              >
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
