"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy md:flex">
      <div className="flex h-20 items-center px-6">
        <Image
          src="/mizan-logo-white.png"
          alt="Mizan BTP"
          width={160}
          height={53}
          priority
          className="h-9 w-auto"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
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
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors",
                isActive
                  ? "bg-terracotta text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 text-xs text-white/40">
        L&apos;équilibre de vos chantiers
      </div>
    </aside>
  );
}
