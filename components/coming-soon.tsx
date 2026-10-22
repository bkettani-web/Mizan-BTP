"use client";

import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

import { useLocale } from "@/lib/i18n/context";

export function ComingSoon({
  titre,
  description,
  icon: Icon = Sparkles,
}: {
  titre: string;
  description: string;
  icon?: LucideIcon;
}) {
  const { t } = useLocale();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-blue/10">
        <Icon className="size-8 text-blue" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">{titre}</h1>
      <p className="mt-2 max-w-sm text-[15px] text-anthracite">
        {description}
      </p>
      <span className="mt-6 inline-flex items-center rounded-full bg-warning-bg px-3.5 py-1.5 text-sm font-semibold text-warning">
        {t("settingsPage.comingSoonBadge")}
      </span>
    </div>
  );
}
