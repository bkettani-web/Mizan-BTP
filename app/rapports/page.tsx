"use client";

import { Wallet, TrendingDown, PiggyBank, TrendingUp } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { MonthlyExpensesChart } from "@/components/dashboard/monthly-expenses-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/lib/store";
import { getArgentDepenseChantier, getDepensesMensuelles, getIndicateursGlobaux } from "@/lib/stats";
import { getStatutChantier, STATUT_LABELS, STATUT_STYLES } from "@/lib/status";
import { formatMontant, formatPourcentage } from "@/lib/format";

export default function RapportsPage() {
  const { chantiers, depenses } = useAppData();
  const indicateurs = getIndicateursGlobaux(chantiers, depenses);
  const depensesMensuelles = getDepensesMensuelles(depenses, 6);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">Rapports</h1>
        <p className="mt-1 text-[15px] text-anthracite">
          La synthèse financière de tous vos chantiers, en un coup d&apos;œil.
        </p>
      </header>

      <section
        aria-label="Chiffres clés"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard icon={Wallet} label="Budget total" value={formatMontant(indicateurs.budgetTotal)} />
        <KpiCard
          icon={TrendingDown}
          label="Argent dépensé"
          value={formatMontant(indicateurs.argentDepense)}
          sublabel={`${formatPourcentage(indicateurs.pourcentageDepense)} du budget`}
        />
        <KpiCard
          icon={PiggyBank}
          label="Reste disponible"
          value={formatMontant(indicateurs.resteDisponible)}
          tone={indicateurs.resteDisponible < 0 ? "danger" : "navy"}
        />
        <KpiCard
          icon={TrendingUp}
          label="Bénéfice prévu"
          value={formatMontant(indicateurs.beneficePrevu)}
          sublabel={`${formatPourcentage(indicateurs.margePourcentage)} de marge estimée`}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Dépenses des 6 derniers mois</CardTitle>
          <CardDescription>Tous chantiers confondus.</CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyExpensesChart data={depensesMensuelles} />
        </CardContent>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-navy">Détail par chantier</h2>
        <div className="flex flex-col gap-3">
          {chantiers.map((chantier) => {
            const argentDepense = getArgentDepenseChantier(chantier, depenses);
            const resteDisponible = chantier.budgetTotal - argentDepense;
            const beneficePrevu = chantier.revenuPrevisionnel - chantier.budgetTotal;
            const statut = getStatutChantier(
              chantier.budgetTotal,
              argentDepense,
              chantier.avancementTravaux,
            );
            const styles = STATUT_STYLES[statut];

            return (
              <Card key={chantier.id}>
                <CardContent className="flex flex-col gap-4 pt-5 sm:pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-navy sm:text-lg">
                      {chantier.nom} <span className="font-normal text-anthracite">— {chantier.ville}</span>
                    </h3>
                    <Badge variant={styles.badge}>
                      <span className={`size-1.5 rounded-full ${styles.dot}`} />
                      {STATUT_LABELS[statut]}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        Budget
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(chantier.budgetTotal)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        Dépensé
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(argentDepense)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        Reste
                      </p>
                      <p
                        className={`mt-0.5 text-[15px] font-semibold ${resteDisponible < 0 ? "text-danger" : "text-navy"}`}
                      >
                        {formatMontant(resteDisponible)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        Marge prévue
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(beneficePrevu)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
