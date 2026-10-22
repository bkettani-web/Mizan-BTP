"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
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
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-center"
          >
            <Icon
              className={cn(
                "size-5",
                isActive ? "text-terracotta" : "text-anthracite",
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium leading-none",
                isActive ? "text-terracotta" : "text-anthracite",
              )}
            >
              {item.shortLabel}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
