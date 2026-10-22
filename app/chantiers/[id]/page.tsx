"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Wallet, TrendingDown, PiggyBank, TrendingUp, Calendar, Receipt } from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { AddExpenseDialog } from "@/components/depenses/add-expense-dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { useAppData } from "@/lib/store";
import { getArgentDepenseChantier, getDepensesDuChantier } from "@/lib/stats";
import { getStatutChantier, STATUT_LABELS, STATUT_STYLES } from "@/lib/status";
import { formatDate, formatMontant, formatPourcentage } from "@/lib/format";

export default function ChantierDetailPage() {
  const params = useParams<{ id: string }>();
  const { chantiers, depenses } = useAppData();
  const chantier = chantiers.find((c) => c.id === params.id);

  if (!chantier) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/chantiers"
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
        >
          <ArrowLeft className="size-4" />
          Tous les chantiers
        </Link>
        <EmptyState
          icon={MapPin}
          titre="Chantier introuvable"
          description="Ce chantier n'existe pas ou a été supprimé."
        />
      </div>
    );
  }

  const argentDepense = getArgentDepenseChantier(chantier, depenses);
  const resteDisponible = chantier.budgetTotal - argentDepense;
  const beneficePrevu = chantier.revenuPrevisionnel - chantier.budgetTotal;
  const pourcentageDepense =
    chantier.budgetTotal > 0 ? (argentDepense / chantier.budgetTotal) * 100 : 0;
  const pourcentageBudget = Math.min(100, Math.round(pourcentageDepense));
  const statut = getStatutChantier(
    chantier.budgetTotal,
    argentDepense,
    chantier.avancementTravaux,
  );
  const styles = STATUT_STYLES[statut];
  const depensesChantier = getDepensesDuChantier(chantier.id, depenses);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/chantiers"
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
        >
          <ArrowLeft className="size-4" />
          Tous les chantiers
        </Link>

        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-navy sm:text-3xl">
                {chantier.nom}
              </h1>
              <Badge variant={styles.badge}>
                <span className={`size-1.5 rounded-full ${styles.dot}`} />
                {STATUT_LABELS[statut]}
              </Badge>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-anthracite">
              <span className="flex items-center gap-1">
                <MapPin className="size-4" />
                {chantier.ville}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                Démarré le {formatDate(chantier.dateDebut)}
              </span>
            </div>
          </div>
          <AddExpenseDialog chantierIdParDefaut={chantier.id} />
        </header>
      </div>

      <section
        aria-label="Chiffres clés du chantier"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <KpiCard icon={Wallet} label="Budget total" value={formatMontant(chantier.budgetTotal)} />
        <KpiCard
          icon={TrendingDown}
          label="Argent dépensé"
          value={formatMontant(argentDepense)}
          sublabel={`${formatPourcentage(pourcentageDepense)} du budget`}
        />
        <KpiCard
          icon={PiggyBank}
          label="Reste disponible"
          value={formatMontant(resteDisponible)}
          tone={resteDisponible < 0 ? "danger" : "navy"}
        />
        <KpiCard
          icon={TrendingUp}
          label="Bénéfice prévu"
          value={formatMontant(beneficePrevu)}
          sublabel="Marge estimée sur ce chantier"
        />
      </section>

      <Card>
        <CardContent className="flex flex-col gap-5 pt-5 sm:pt-6">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-anthracite">Avancement des travaux</span>
              <span className="font-semibold text-navy">
                {formatPourcentage(chantier.avancementTravaux)}
              </span>
            </div>
            <Progress value={chantier.avancementTravaux} indicatorClassName="bg-blue" />
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
                statut === "rouge" ? "bg-danger" : statut === "orange" ? "bg-warning" : "bg-success"
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dépenses de ce chantier</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border">
          {depensesChantier.length === 0 ? (
            <EmptyState
              icon={Receipt}
              titre="Aucune dépense enregistrée"
              description="Ajoutez la première dépense de ce chantier avec le bouton ci-dessus."
            />
          ) : (
            depensesChantier.map((depense) => (
              <div
                key={depense.id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-navy">
                    {depense.description}
                  </p>
                  <p className="mt-0.5 text-sm text-anthracite">
                    {depense.categorie} · {formatDate(depense.date)}
                    {depense.fournisseur ? ` · ${depense.fournisseur}` : ""}
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
    </div>
  );
}
