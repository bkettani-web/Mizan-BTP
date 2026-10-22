import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TONES = {
  navy: "bg-navy/8 text-navy",
  terracotta: "bg-terracotta/10 text-terracotta",
  blue: "bg-blue/10 text-blue",
  success: "bg-success-bg text-success",
} as const;

export function KpiCard({
  icon: Icon,
  label,
  value,
  sublabel,
  tone = "navy",
  negatif = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel?: string;
  tone?: keyof typeof TONES;
  /** Affiche le montant en rouge (ex. un reste disponible négatif). */
  negatif?: boolean;
}) {
  return (
    <Card className="group overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <CardContent className="flex flex-col gap-4 pt-5 sm:pt-6">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-2xl transition-transform duration-200 ease-out group-hover:scale-105",
            TONES[tone],
          )}
        >
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-anthracite">{label}</p>
          <p
            className={cn(
              "mt-1 text-[28px] font-extrabold tracking-tight sm:text-3xl",
              negatif ? "text-danger" : "text-navy",
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
