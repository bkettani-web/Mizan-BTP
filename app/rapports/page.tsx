"use client";

import { Wallet, TrendingDown, PiggyBank, TrendingUp } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { MonthlyExpensesChart } from "@/components/dashboard/monthly-expenses-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/lib/store";
import { useLocale } from "@/lib/i18n/context";
import { getArgentDepenseChantier, getDepensesMensuelles, getIndicateursGlobaux } from "@/lib/stats";
import { getStatutChantier, STATUT_STYLES } from "@/lib/status";
import { formatMontant, formatPourcentage } from "@/lib/format";

export default function RapportsPage() {
  const { chantiers, depenses } = useAppData();
  const { locale, t } = useLocale();
  const indicateurs = getIndicateursGlobaux(chantiers, depenses);
  const depensesMensuelles = getDepensesMensuelles(depenses, 6, locale);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {t("reportsPage.title")}
        </h1>
        <p className="mt-1 text-[15px] text-anthracite">{t("reportsPage.subtitle")}</p>
      </header>

      <section
        aria-label={t("kpi.budgetTotal")}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard
          icon={Wallet}
          label={t("kpi.budgetTotal")}
          value={formatMontant(indicateurs.budgetTotal, locale)}
          tone="navy"
        />
        <KpiCard
          icon={TrendingDown}
          label={t("kpi.spent")}
          value={formatMontant(indicateurs.argentDepense, locale)}
          sublabel={t("kpi.spentOfBudget", { percent: formatPourcentage(indicateurs.pourcentageDepense) })}
          tone="terracotta"
        />
        <KpiCard
          icon={PiggyBank}
          label={t("kpi.remaining")}
          value={formatMontant(indicateurs.resteDisponible, locale)}
          tone="blue"
          negatif={indicateurs.resteDisponible < 0}
        />
        <KpiCard
          icon={TrendingUp}
          label={t("kpi.profit")}
          value={formatMontant(indicateurs.beneficePrevu, locale)}
          sublabel={t("kpi.profitMargin", { percent: formatPourcentage(indicateurs.margePourcentage) })}
          tone="success"
          negatif={indicateurs.beneficePrevu < 0}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.chartTitle")}</CardTitle>
          <CardDescription>{t("reportsPage.chartSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <MonthlyExpensesChart data={depensesMensuelles} />
        </CardContent>
      </Card>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold tracking-tight text-navy">
          {t("reportsPage.detailByProject")}
        </h2>
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
            const StatutIcon = styles.icon;

            return (
              <Card key={chantier.id} className="relative overflow-hidden ps-1">
                <span
                  aria-hidden
                  className={`absolute inset-y-0 start-0 w-1.5 ${styles.accent}`}
                />
                <CardContent className="flex flex-col gap-4 pt-5 ps-4 sm:pt-6 sm:ps-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-navy sm:text-lg">
                      {chantier.nom} <span className="font-normal text-anthracite">— {chantier.ville}</span>
                    </h3>
                    <Badge variant={styles.badgeSolid}>
                      <StatutIcon />
                      {t(`status.${statut}`)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        {t("reportsPage.budget")}
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(chantier.budgetTotal, locale)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        {t("reportsPage.spent")}
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(argentDepense, locale)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        {t("reportsPage.remaining")}
                      </p>
                      <p
                        className={`mt-0.5 text-[15px] font-semibold ${resteDisponible < 0 ? "text-danger" : "text-navy"}`}
                      >
                        {formatMontant(resteDisponible, locale)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">
                        {t("reportsPage.expectedMargin")}
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold text-navy">
                        {formatMontant(beneficePrevu, locale)}
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
