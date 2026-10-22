import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  icon: Icon,
  label,
  value,
  sublabel,
  tone = "navy",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  tone?: "navy" | "danger";
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-5 sm:pt-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-surface">
          <Icon className="size-5 text-blue" />
        </div>
        <div>
          <p className="text-sm text-anthracite">{label}</p>
          <p
            className={cn(
              "mt-1 text-2xl font-bold tracking-tight sm:text-[28px]",
              tone === "danger" ? "text-danger" : "text-navy",
            )}
          >
            {value}
          </p>
          {sublabel ? (
            <p className="mt-1 text-sm font-medium text-anthracite">
              {sublabel}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
