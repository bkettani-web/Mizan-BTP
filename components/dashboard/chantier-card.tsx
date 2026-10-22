import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatMontant, formatPourcentage } from "@/lib/format";
import { getArgentDepenseChantier } from "@/lib/stats";
import { getStatutChantier, STATUT_LABELS, STATUT_STYLES } from "@/lib/status";
import type { Chantier, Depense } from "@/lib/types";

export function ChantierCard({
  chantier,
  depenses,
}: {
  chantier: Chantier;
  depenses: Depense[];
}) {
  const argentDepense = getArgentDepenseChantier(chantier, depenses);
  const statut = getStatutChantier(
    chantier.budgetTotal,
    argentDepense,
    chantier.avancementTravaux,
  );
  const styles = STATUT_STYLES[statut];
  const pourcentageBudget = Math.min(
    100,
    Math.round((argentDepense / chantier.budgetTotal) * 100),
  );

  return (
    <Link href={`/chantiers/${chantier.id}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardContent className="flex flex-col gap-5 pt-5 sm:pt-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-1 text-base font-semibold text-navy sm:text-lg">
                {chantier.nom}
                <ChevronRight className="size-4 text-anthracite/50 transition-transform group-hover:translate-x-0.5" />
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-anthracite">
                <MapPin className="size-3.5" />
                {chantier.ville}
              </p>
            </div>
            <Badge variant={styles.badge} className="shrink-0">
              <span className={`size-1.5 rounded-full ${styles.dot}`} />
              {STATUT_LABELS[statut]}
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-anthracite">Avancement des travaux</span>
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
                <span className="text-anthracite">Budget consommé</span>
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
                {formatMontant(argentDepense)} dépensés sur{" "}
                {formatMontant(chantier.budgetTotal)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
