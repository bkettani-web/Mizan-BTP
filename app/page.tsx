"use client";

import { Wallet, TrendingDown, PiggyBank, TrendingUp, Building2 } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChantierCard } from "@/components/dashboard/chantier-card";
import { MonthlyExpensesChart } from "@/components/dashboard/monthly-expenses-chart";
import { RecentExpenses } from "@/components/dashboard/recent-expenses";
import { AddExpenseDialog } from "@/components/depenses/add-expense-dialog";
import { EmptyState } from "@/components/empty-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppData } from "@/lib/store";
import { getDepensesMensuelles, getDernieresDepenses, getIndicateursGlobaux } from "@/lib/stats";
import { formatMontant, formatPourcentage } from "@/lib/format";

export default function DashboardPage() {
  const { chantiers, depenses } = useAppData();
  const indicateurs = getIndicateursGlobaux(chantiers, depenses);
  const depensesMensuelles = getDepensesMensuelles(depenses, 6);
  const dernieresDepenses = getDernieresDepenses(depenses, 5);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">
            Bonjour, voici l&apos;état de vos chantiers
          </h1>
          <p className="mt-1 text-[15px] text-anthracite">
            Un coup d&apos;œil suffit pour savoir où vous en êtes.
          </p>
        </div>
        <AddExpenseDialog />
      </header>

      <section
        aria-label="Chiffres clés"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard
          icon={Wallet}
          label="Budget total"
          value={formatMontant(indicateurs.budgetTotal)}
        />
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

      <section aria-label="Mes chantiers" className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-navy">Mes chantiers</h2>
        {chantiers.length === 0 ? (
          <EmptyState
            icon={Building2}
            titre="Vous n'avez pas encore de chantier"
            description="Créez le premier en 1 minute pour commencer à suivre son budget."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {chantiers.map((chantier) => (
              <ChantierCard key={chantier.id} chantier={chantier} depenses={depenses} />
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Dépenses des 6 derniers mois</CardTitle>
            <CardDescription>
              Total dépensé sur l&apos;ensemble de vos chantiers, mois par mois.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MonthlyExpensesChart data={depensesMensuelles} />
          </CardContent>
        </Card>

        <div className="xl:col-span-2">
          <RecentExpenses depenses={dernieresDepenses} chantiers={chantiers} />
        </div>
      </section>
    </div>
  );
}
