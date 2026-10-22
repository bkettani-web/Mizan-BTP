import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n/context";
import { formatMontant, formatPourcentage } from "@/lib/format";
import { getArgentDepenseChantier } from "@/lib/stats";
import { getStatutChantier, STATUT_STYLES } from "@/lib/status";
import type { Chantier, Depense } from "@/lib/types";

export function ChantierCard({
  chantier,
  depenses,
}: {
  chantier: Chantier;
  depenses: Depense[];
}) {
  const { locale, t } = useLocale();
  const argentDepense = getArgentDepenseChantier(chantier, depenses);
  const statut = getStatutChantier(
    chantier.budgetTotal,
    argentDepense,
    chantier.avancementTravaux,
  );
  const styles = STATUT_STYLES[statut];
  const StatutIcon = styles.icon;
  const pourcentageBudget = Math.min(
    100,
    Math.round((argentDepense / chantier.budgetTotal) * 100),
  );

  return (
    <Link href={`/chantiers/${chantier.id}`} className="group block">
      <Card className="relative h-full overflow-hidden ps-1 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
        <span
          aria-hidden
          className={`absolute inset-y-0 start-0 w-1.5 ${styles.accent}`}
        />
        <CardContent className="flex flex-col gap-5 pt-5 ps-4 sm:pt-6 sm:ps-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-1 text-base font-semibold text-navy sm:text-lg">
                {chantier.nom}
                <ChevronRight className="size-4 text-anthracite/50 transition-transform duration-200 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:text-terracotta" />
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-anthracite">
                <MapPin className="size-3.5" />
                {chantier.ville}
              </p>
            </div>
            <Badge variant={styles.badgeSolid} className="shrink-0">
              <StatutIcon />
              {t(`status.${statut}`)}
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-anthracite">{t("projectCard.progress")}</span>
                <span className="font-semibold text-navy">
                  {formatPourcentage(chantier.avancementTravaux)}
                </span>
              </div>
              <Progress
                value={chantier.avancementTravaux}
                indicatorClassName="bg-blue"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-anthracite">{t("projectCard.budgetConsumed")}</span>
                <span className="font-semibold text-navy">
                  {formatPourcentage(pourcentageBudget)}
                </span>
              </div>
              <Progress
                value={pourcentageBudget}
                indicatorClassName={
                  statut === "rouge"
                    ? "bg-danger"
                    : statut === "orange"
                      ? "bg-warning"
                      : "bg-success"
                }
              />
              <p className="mt-1.5 text-sm text-anthracite">
                {t("projectCard.spentOf", {
                  spent: formatMontant(argentDepense, locale),
                  total: formatMontant(chantier.budgetTotal, locale),
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
