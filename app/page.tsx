"use client";

import { Wallet, TrendingDown, PiggyBank, TrendingUp, Building2, HardHat } from "lucide-react";

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
      <header className="bg-hero-navy animate-float-in relative overflow-hidden rounded-3xl px-6 py-8 text-white shadow-[var(--shadow-card-hover)] sm:px-8 sm:py-10">
        <HardHat
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-44 text-white/[0.06] sm:size-60"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-terracotta-light">
              Mizan BTP
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-[34px]">
              Bonjour, voici l&apos;état de vos chantiers
            </h1>
            <p className="mt-2 max-w-md text-[15px] text-white/70">
              Un coup d&apos;œil suffit pour savoir où vous en êtes.
            </p>
          </div>
          <AddExpenseDialog />
        </div>
      </header>

      <section
        aria-label="Chiffres clés"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard
          icon={Wallet}
          label="Budget total"
          value={formatMontant(indicateurs.budgetTotal)}
          tone="navy"
        />
        <KpiCard
          icon={TrendingDown}
          label="Argent dépensé"
          value={formatMontant(indicateurs.argentDepense)}
          sublabel={`${formatPourcentage(indicateurs.pourcentageDepense)} du budget`}
          tone="terracotta"
        />
        <KpiCard
          icon={PiggyBank}
          label="Reste disponible"
          value={formatMontant(indicateurs.resteDisponible)}
          tone="blue"
          negatif={indicateurs.resteDisponible < 0}
        />
        <KpiCard
          icon={TrendingUp}
          label="Bénéfice prévu"
          value={formatMontant(indicateurs.beneficePrevu)}
          sublabel={`${formatPourcentage(indicateurs.margePourcentage)} de marge estimée`}
          tone="success"
          negatif={indicateurs.beneficePrevu < 0}
        />
      </section>

      <section aria-label="Mes chantiers" className="flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight text-navy">Mes chantiers</h2>
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
