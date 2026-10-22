import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/context";
import { formatDate, formatMontant } from "@/lib/format";
import type { Chantier, Depense } from "@/lib/types";

export function RecentExpenses({
  depenses,
  chantiers,
}: {
  depenses: Depense[];
  chantiers: Chantier[];
}) {
  const { locale, t } = useLocale();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t("dashboard.recentExpenses")}</CardTitle>
        <Link
          href="/depenses"
          className="flex items-center gap-1 text-sm font-semibold text-blue hover:underline"
        >
          {t("common.viewAll")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {depenses.length === 0 ? (
          <p className="py-2 text-sm text-anthracite">{t("dashboard.noExpensesYet")}</p>
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
                  {chantiers.find((c) => c.id === depense.chantierId)?.nom ??
                    t("common.projectNotFoundShort")}{" "}
                  · {formatDate(depense.date, locale)}
                </p>
              </div>
              <p className="shrink-0 text-[15px] font-semibold text-navy">
                {formatMontant(depense.montant, locale)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
