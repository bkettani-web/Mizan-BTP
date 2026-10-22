import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatMontant } from "@/lib/format";
import type { Chantier, Depense } from "@/lib/types";

export function RecentExpenses({
  depenses,
  chantiers,
}: {
  depenses: Depense[];
  chantiers: Chantier[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Dernières dépenses</CardTitle>
        <Link
          href="/depenses"
          className="flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
        >
          Tout voir
          <ArrowRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {depenses.length === 0 ? (
          <p className="py-2 text-sm text-anthracite">
            Aucune dépense enregistrée pour le moment.
          </p>
        ) : (
          depenses.map((depense) => (
            <div
              key={depense.id}
              className="flex items-center justify-between gap-4 rounded-lg py-3.5 transition-colors first:pt-0 last:pb-0 hover:bg-surface"
            >
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-navy">
                  {depense.description}
                </p>
                <p className="mt-0.5 text-sm text-anthracite">
                  {chantiers.find((c) => c.id === depense.chantierId)?.nom ?? "Chantier inconnu"} ·{" "}
                  {formatDate(depense.date)}
                </p>
              </div>
              <p className="shrink-0 text-[15px] font-semibold text-navy">
                {formatMontant(depense.montant)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
