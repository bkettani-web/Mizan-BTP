import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  titre,
  description,
  action,
}: {
  icon: LucideIcon;
  titre: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white px-6 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-blue/10">
        <Icon className="size-7 text-blue" />
      </div>
      <div>
        <p className="text-lg font-semibold text-navy">{titre}</p>
        <p className="mt-1 max-w-xs text-sm text-anthracite">{description}</p>
      </div>
      {action}
    </div>
  );
}
